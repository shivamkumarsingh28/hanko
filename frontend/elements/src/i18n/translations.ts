import { en } from "./en";

export interface Translations {
  [lang: string]: Partial<Translation>;
}

export interface Translation {
  headlines: {
    error: string;
    accountNotFound: string;
    loginEmail: string;
    loginEmailNoSignup: string;
    loginFinished: string;
    loginPasscode: string;
    loginPassword: string;
    registerAuthenticator: string;
    registerConfirm: string;
    registerPassword: string;
    securityKeyLogin: string;
    securityKeySetUp: string;
    mfaSetUp: string;
    otpLogin: string;
    otpSetUp: string;
    profileEmails: string;
    profilePassword: string;
    profilePasskeys: string;
    isPrimaryEmail: string;
    setPrimaryEmail: string;
    createEmail: string;
    createUsername: string;
    emailVerified: string;
    emailUnverified: string;
    emailDelete: string;
    renamePasskey: string;
    deletePasskey: string;
    lastUsedAt: string;
    createdAt: string;
    connectedAccounts: string;
    deleteAccount: string;
    signIn: string;
    signUp: string;
    selectLoginMethod: string;
    setupLoginMethod: string;
    lastUsed: string;
    ipAddress: string;
    revokeSession: string;
    profileSessions: string;
    renameSecurityKey: string;
    deleteSecurityKey: string;
    securityKeys: string;
  };
  texts: {
    enterPasscode: string;
    enterPasscodeNoEmail: string;
    setupPasskey: string;
    createAccount: string;
    mfaSetUp: string;
    noAccountExists: string;
    otpEnterVerificationCode: string;
    otpLogin: string;
    otpScanQRCode: string;
    otpSecretKey: string;
    passwordFormatHint: string;
    securityKeyLogin: string;
    isPrimaryEmail: string;
    securityKeySetUp: string;
    setPrimaryEmail: string;
    emailVerified: string;
    emailUnverified: string;
    emailDelete: string;
    renamePasskey: string;
    deletePasskey: string;
    deleteAccount: string;
    selectLoginMethodForFutureLogins: string;
    howDoYouWantToLogin: string;
    deleteSecurityKey: string;
    renameSecurityKey: string;
    setupSecurityKey: string;
  };
  labels: {
    authenticatorApp: string;
    or: string;
    no: string;
    yes: string;
    email: string;
    continue: string;
    copied: string;
    skip: string;
    save: string;
    password: string;
    passkey: string;
    passcode: string;
    signInPassword: string;
    signInPasscode: string;
    forgotYourPassword: string;
    back: string;
    registerAuthenticator: string;
    securityKey: string;
    securityKeyUse: string;
    signIn: string;
    signInPasskey: string;
    signUp: string;
    sendNewPasscode: string;
    passwordRetryAfter: string;
    passcodeResendAfter: string;
    unverifiedEmail: string;
    primaryEmail: string;
    setAsPrimaryEmail: string;
    verify: string;
    delete: string;
    newEmailAddress: string;
    newPassword: string;
    rename: string;
    newPasskeyName: string;
    addEmail: string;
    createPasskey: string;
    webauthnUnsupported: string;
    signInWith: string;
    deleteAccount: string;
    emailOrUsername: string;
    username: string;
    optional: string;
    dontHaveAnAccount: string;
    alreadyHaveAnAccount: string;
    changePassword: string;
    setPassword: string;
    changeUsername: string;
    setUsername: string;
    revoke: string;
    currentSession: string;
    newSecurityKeyName: string;
    createSecurityKey: string;
  };
  errors: {
    somethingWentWrong: string;
    requestTimeout: string;
    invalidPassword: string;
    invalidPasscode: string;
    passcodeAttemptsReached: string;
    tooManyRequests: string;
    unauthorized: string;
    invalidWebauthnCredential: string;
    passcodeExpired: string;
    userVerification: string;
    emailAddressAlreadyExistsError: string;
    maxNumOfEmailAddressesReached: string;
    thirdPartyAccessDenied: string;
    thirdPartyMultipleAccounts: string;
    thirdPartyUnverifiedEmail: string;
    signupDisabled: string;
  };
  flowErrors: {
    technical_error: string;
    flow_expired_error: string;
    value_invalid_error: string;
    passcode_invalid: string;
    passkey_invalid: string;
    passcode_max_attempts_reached: string;
    rate_limit_exceeded: string;
    unknown_username_error: string;
    username_already_exists: string;
    invalid_username_error: string;
    email_already_exists: string;
    not_found: string;
    flow_discontinuity_error: string;
    operation_not_permitted_error: string;
    form_data_invalid_error: string;
    unauthorized: string;
    value_missing_error: string;
    value_too_long_error: string;
    value_too_short_error: string;
  };
}

export const defaultTranslations: Translations = {
  en,
};
