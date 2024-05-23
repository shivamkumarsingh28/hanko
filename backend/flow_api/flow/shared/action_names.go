package shared

import "github.com/teamhanko/hanko/backend/flowpilot"

const (
	ActionAccountDelete                          flowpilot.ActionName = "account_delete"
	ActionBack                                   flowpilot.ActionName = "back"
	ActionContinueToPasscodeConfirmation         flowpilot.ActionName = "continue_to_passcode_confirmation"
	ActionContinueToPasscodeConfirmationRecovery flowpilot.ActionName = "continue_to_passcode_confirmation_recovery"
	ActionContinueToPasskeyRegistration          flowpilot.ActionName = "continue_to_passkey_registration"
	ActionContinueToPasswordLogin                flowpilot.ActionName = "continue_to_password_login"
	ActionContinueToPasswordRegistration         flowpilot.ActionName = "continue_to_password_registration"
	ActionContinueWithLoginIdentifier            flowpilot.ActionName = "continue_with_login_identifier"
	ActionEmailCreate                            flowpilot.ActionName = "email_create"
	ActionEmailDelete                            flowpilot.ActionName = "email_delete"
	ActionEmailSetPrimary                        flowpilot.ActionName = "email_set_primary"
	ActionEmailVerify                            flowpilot.ActionName = "email_verify"
	ActionExchangeToken                          flowpilot.ActionName = "exchange_token"
	ActionPasswordDelete                         flowpilot.ActionName = "password_delete"
	ActionPasswordLogin                          flowpilot.ActionName = "password_login"
	ActionPasswordRecovery                       flowpilot.ActionName = "password_recovery"
	ActionPasswordSet                            flowpilot.ActionName = "password_set"
	ActionRegisterClientCapabilities             flowpilot.ActionName = "register_client_capabilities"
	ActionRegisterLoginIdentifier                flowpilot.ActionName = "register_login_identifier"
	ActionRegisterPassword                       flowpilot.ActionName = "register_password"
	ActionResendPasscode                         flowpilot.ActionName = "resend_passcode"
	ActionSkip                                   flowpilot.ActionName = "skip"
	ActionThirdPartyOAuth                        flowpilot.ActionName = "thirdparty_oauth"
	ActionUsernameSet                            flowpilot.ActionName = "username_set"
	ActionEmailAddressSet                        flowpilot.ActionName = "email_address_set"
	ActionVerifyPasscode                         flowpilot.ActionName = "verify_passcode"
	ActionWebauthnCredentialCreate               flowpilot.ActionName = "webauthn_credential_create"
	ActionWebauthnCredentialDelete               flowpilot.ActionName = "webauthn_credential_delete"
	ActionWebauthnCredentialRename               flowpilot.ActionName = "webauthn_credential_rename"
	ActionWebauthnGenerateCreationOptions        flowpilot.ActionName = "webauthn_generate_creation_options"
	ActionWebauthnGenerateRequestOptions         flowpilot.ActionName = "webauthn_generate_request_options"
	ActionWebauthnVerifyAssertionResponse        flowpilot.ActionName = "webauthn_verify_assertion_response"
	ActionWebauthnVerifyAttestationResponse      flowpilot.ActionName = "webauthn_verify_attestation_response"
)
