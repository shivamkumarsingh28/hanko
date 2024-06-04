package profile

import (
	"errors"
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/teamhanko/hanko/backend/flow_api/flow/shared"
	"github.com/teamhanko/hanko/backend/flow_api/services"
	"github.com/teamhanko/hanko/backend/flowpilot"
	"github.com/teamhanko/hanko/backend/persistence/models"
)

type WebauthnVerifyAttestationResponse struct {
	shared.Action
}

func (a WebauthnVerifyAttestationResponse) GetName() flowpilot.ActionName {
	return shared.ActionWebauthnVerifyAttestationResponse
}

func (a WebauthnVerifyAttestationResponse) GetDescription() string {
	return "Send the result which was generated by creating a webauthn credential."
}

func (a WebauthnVerifyAttestationResponse) Initialize(c flowpilot.InitializationContext) {
	deps := a.GetDeps(c)

	if !deps.Cfg.Passkey.Enabled || !c.Stash().Get("webauthn_available").Bool() {
		c.SuspendAction()
	}

	c.AddInputs(flowpilot.JSONInput("public_key").Required(true).Persist(false))
}

func (a WebauthnVerifyAttestationResponse) Execute(c flowpilot.ExecutionContext) error {
	deps := a.GetDeps(c)

	if valid := c.ValidateInputData(); !valid {
		return c.ContinueFlowWithError(c.GetCurrentState(), flowpilot.ErrorFormDataInvalid)
	}

	userModel, ok := c.Get("session_user").(*models.User)
	if !ok {
		return c.ContinueFlowWithError(c.GetErrorState(), flowpilot.ErrorOperationNotPermitted)
	}

	if !c.Stash().Get("webauthn_session_data_id").Exists() {
		return errors.New("webauthn_session_data_id does not exist in the stash")
	}

	sessionDataID, err := uuid.FromString(c.Stash().Get("webauthn_session_data_id").String())
	if err != nil {
		return fmt.Errorf("failed to parse webauthn_session_data_id: %w", err)
	}

	primaryEmailModel := userModel.Emails.GetPrimary()
	var primaryEmailAddress string
	if primaryEmailModel != nil {
		primaryEmailAddress = primaryEmailModel.Address
	}

	params := services.VerifyAttestationResponseParams{
		Tx:            deps.Tx,
		SessionDataID: sessionDataID,
		PublicKey:     c.Input().Get("public_key").String(),
		UserID:        userModel.ID,
		Email:         primaryEmailAddress,
		Username:      userModel.Username.String,
	}

	credential, err := deps.WebauthnService.VerifyAttestationResponse(params)
	if err != nil {
		if errors.Is(err, services.ErrInvalidWebauthnCredential) {
			return c.ContinueFlowWithError(c.GetCurrentState(), shared.ErrorPasskeyInvalid.Wrap(err))
		}

		return fmt.Errorf("failed to verify attestation response: %w", err)
	}

	err = c.Stash().Set("webauthn_credential", credential)
	if err != nil {
		return fmt.Errorf("failed to set webauthn_credential to the stash: %w", err)
	}

	// Set user_id explicitly because persisting the credential is now part of a shared hook which has
	// to work in multiple flows, e.g. the login flow, which does not work with the session_user in the
	// context like the profile does
	err = c.Stash().Set("user_id", userModel.ID.String())
	if err != nil {
		return fmt.Errorf("failed to set user_id to the stash: %w", err)
	}

	return c.ContinueFlow(shared.StateProfileInit)
}

func (a WebauthnVerifyAttestationResponse) Finalize(c flowpilot.FinalizationContext) error {
	return nil
}
