package profile

import (
	"errors"
	"fmt"
	"github.com/teamhanko/hanko/backend/flow_api/flow/shared"
	"github.com/teamhanko/hanko/backend/flowpilot"
	"github.com/teamhanko/hanko/backend/persistence/models"
)

type PasswordDelete struct {
	shared.Action
}

func (a PasswordDelete) GetName() flowpilot.ActionName {
	return ActionPasswordDelete
}

func (a PasswordDelete) GetDescription() string {
	return "Delete a password."
}

func (a PasswordDelete) Initialize(c flowpilot.InitializationContext) {
	if a.mustSuspend(c) {
		c.SuspendAction()
		return
	}
}

func (a PasswordDelete) Execute(c flowpilot.ExecutionContext) error {
	deps := a.GetDeps(c)

	userModel, ok := c.Get("session_user").(*models.User)
	if !ok {
		return c.ContinueFlowWithError(c.GetErrorState(), flowpilot.ErrorOperationNotPermitted)
	}

	if !deps.Cfg.Passcode.Enabled && len(userModel.WebauthnCredentials) == 0 {
		return c.ContinueFlowWithError(
			c.GetCurrentState(),
			flowpilot.ErrorFlowDiscontinuity.
				Wrap(errors.New("cannot delete password when recovery not possible and no webauthn credential is available")))
	}

	passwordCredentialModel, err := deps.Persister.GetPasswordCredentialPersisterWithConnection(deps.Tx).GetByUserID(userModel.ID)
	if err != nil {
		return fmt.Errorf("could not fetch password credential: %w", err)
	}

	if passwordCredentialModel == nil {
		return c.ContinueFlow(StateProfileInit)
	}

	err = deps.Persister.GetPasswordCredentialPersisterWithConnection(deps.Tx).Delete(*passwordCredentialModel)
	if err != nil {
		return fmt.Errorf("could not delete password credential: %w", err)
	}

	updatedUserModel, err := deps.Persister.GetEmailPersisterWithConnection(deps.Tx).Get(userModel.ID)
	if err != nil {
		return fmt.Errorf("could not fetch user: %w", err)
	}
	c.Set("session_user", updatedUserModel)

	if a.mustSuspend(c) {
		c.SuspendAction()
	}

	return c.ContinueFlow(StateProfileInit)
}

func (a PasswordDelete) mustSuspend(c flowpilot.Context) bool {
	deps := a.GetDeps(c)

	if !deps.Cfg.Password.Enabled {
		return true
	}

	userModel, ok := c.Get("session_user").(*models.User)
	if !ok {
		return true
	}

	if userModel.PasswordCredential == nil {
		return true
	}

	return false
}
