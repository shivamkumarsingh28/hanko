package shared

import (
	"github.com/teamhanko/hanko/backend/flowpilot"
	"net/http"
)

var (
	ErrorConfigurationError         = flowpilot.NewFlowError("configuration_error", "The configuration contains errors.", http.StatusInternalServerError)
	ErrorDeviceNotCapable           = flowpilot.NewFlowError("device_not_capable", "The device can not login or register.", http.StatusOK) // The device is not able to provide at least one login method.
	ErrorPasscodeInvalid            = flowpilot.NewFlowError("passcode_invalid", "The passcode is invalid.", http.StatusUnauthorized)
	ErrorPasskeyInvalid             = flowpilot.NewFlowError("passkey_invalid", "The passkey is invalid.", http.StatusUnauthorized)
	ErrorPasscodeMaxAttemptsReached = flowpilot.NewFlowError("passcode_max_attempts_reached", "The passcode was entered wrong too many times.", http.StatusUnauthorized)
	ErrorRateLimitExceeded          = flowpilot.NewFlowError("rate_limit_exceeded", "The rate limit has been exceeded.", http.StatusTooManyRequests)
	ErrorNotFound                   = flowpilot.NewFlowError("not_found", "The requested resource was not found.", http.StatusNotFound)
)

var (
	ErrorEmailAlreadyExists    = flowpilot.NewInputError("email_already_exists", "The email address already exists.")
	ErrorUsernameAlreadyExists = flowpilot.NewInputError("username_already_exists", "The username already exists.")
	ErrorUnknownUsername       = flowpilot.NewInputError("unknown_username_error", "The username is unknown.")
)