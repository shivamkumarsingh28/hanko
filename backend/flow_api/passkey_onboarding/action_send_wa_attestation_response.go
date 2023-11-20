package passkey_onboarding

import (
	"fmt"
	"github.com/go-webauthn/webauthn/protocol"
	"github.com/gofrs/uuid"
	"github.com/teamhanko/hanko/backend/dto/intern"
	"github.com/teamhanko/hanko/backend/flow_api/shared"
	"github.com/teamhanko/hanko/backend/flowpilot"
	"strings"
)

type SendWAAttestationResponse struct {
	shared.Action
}

func (a SendWAAttestationResponse) GetName() flowpilot.ActionName {
	return ActionSendWAAttestationResponse
}

func (a SendWAAttestationResponse) GetDescription() string {
	return "Send the result which was generated by creating a webauthn credential."
}

func (a SendWAAttestationResponse) Initialize(c flowpilot.InitializationContext) {
	if !c.Stash().Get("webauthn_available").Bool() {
		c.SuspendAction()
	}

	c.AddInputs(flowpilot.StringInput("public_key").Required(true).Persist(false))
}

func (a SendWAAttestationResponse) Execute(c flowpilot.ExecutionContext) error {
	if valid := c.ValidateInputData(); !valid {
		return c.ContinueFlowWithError(c.GetCurrentState(), flowpilot.ErrorFormDataInvalid)
	}

	deps := a.GetDeps(c)

	response, err := protocol.ParseCredentialCreationResponseBody(strings.NewReader(c.Input().Get("public_key").String()))
	if err != nil {
		return err
	}

	sessionDataId, err := uuid.FromString(c.Stash().Get("webauthn_session_data_id").String())
	if err != nil {
		return err
	}
	sessionData, err := deps.Persister.GetWebauthnSessionDataPersister().Get(sessionDataId)
	if err != nil {
		return err
	}
	userId, err := uuid.FromString(c.Stash().Get("user_id").String())
	if err != nil {
		return err
	}
	webauthnUser := WebAuthnUser{
		ID:       userId,
		Email:    c.Stash().Get("email").String(),
		Username: c.Stash().Get("username").String(),
	}

	credential, err := deps.Cfg.Webauthn.Handler.CreateCredential(webauthnUser, *intern.WebauthnSessionDataFromModel(sessionData), response)
	if err != nil {
		return c.ContinueFlowWithError(c.GetCurrentState(), flowpilot.ErrorFormDataInvalid.Wrap(err))
	}

	err = c.Stash().Set("passkey_credential", credential)
	if err != nil {
		return err
	}

	err = deps.Persister.GetWebauthnSessionDataPersisterWithConnection(deps.Tx).Delete(*sessionData)
	if err != nil {
		return fmt.Errorf("failed to delete webauthn session data: %w", err)
	}

	return c.EndSubFlow()
}
