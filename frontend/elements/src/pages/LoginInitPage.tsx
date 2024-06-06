import { Fragment, useContext, useEffect, useMemo, useState, } from "preact/compat";

import { HankoError, WebauthnSupport } from "@teamhanko/hanko-frontend-sdk";
import { State } from "@teamhanko/hanko-frontend-sdk/dist/lib/flow-api/State";

import { AppContext } from "../contexts/AppProvider";
import { TranslateContext } from "@denysvuika/preact-translate";
import { useFlowState } from "../contexts/FlowState";

import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Content from "../components/wrapper/Content";
import Form from "../components/form/Form";
import Divider from "../components/spacer/Divider";
import ErrorBox from "../components/error/ErrorBox";
import Headline1 from "../components/headline/Headline1";
import Link from "../components/link/Link";
import Footer from "../components/wrapper/Footer";

interface Props {
  state: State<"login_init">;
}

type IdentifierTypes = "username" | "email" | "identifier";

const LoginInitPage = (props: Props) => {
  const { t } = useContext(TranslateContext);
  const {
    init,
    initialComponentName,
    setLoadingAction,
    uiState,
    setUIState,
    stateHandler,
    hidePasskeyButtonOnLogin,
  } = useContext(AppContext);

  const [identifierType, setIdentifierType] = useState<IdentifierTypes>(null);
  const { flowState } = useFlowState(props.state);
  const isWebAuthnSupported = WebauthnSupport.supported();
  const [thirdPartyError, setThirdPartyError] = useState<HankoError | undefined>(undefined)

  const onIdentifierInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const { value } = event.target;

      switch (identifierType) {
        case "email":
          setUIState((prev) => ({ ...prev, email: value, username: null }));
          break;
        case "username":
          setUIState((prev) => ({ ...prev, email: null, username: value }));
          break;
        case "identifier":
          if (value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
            setUIState((prev) => ({ ...prev, email: value, username: null }));
          } else {
            setUIState((prev) => ({ ...prev, email: null, username: value }));
          }
          break;
      }
    }
  };

  const onEmailSubmit = async (event: Event) => {
    event.preventDefault();

    setLoadingAction("email-submit");

    const nextState = await flowState.actions
      .continue_with_login_identifier({
        [identifierType]: uiState.email || uiState.username,
      })
      .run();

    setLoadingAction(null);

    stateHandler[nextState.name](nextState);
  };

  const onPasskeySubmit = async (event: Event) => {
    event.preventDefault();

    setLoadingAction("passkey-submit");

    const nextState = await flowState.actions
      .webauthn_generate_request_options(null)
      .run();

    stateHandler[nextState.name](nextState);
  };

  const onRegisterClick = async (event: Event) => {
    event.preventDefault();
    init("registration");
  };

  const onThirdpartySubmit = async (event: Event, name: string) => {
    event.preventDefault()
    setLoadingAction("thirdparty-submit")

    const nextState = await flowState.actions.thirdparty_oauth({
      provider: name,
      redirect_to: window.location.toString()
    }).run()

    stateHandler[nextState.name](nextState)
  };

  const showDivider = useMemo(
    () => !!flowState.actions.webauthn_generate_request_options?.(null) || !!flowState.actions.thirdparty_oauth?.(null),
    [flowState.actions],
  );

  const { inputs } = flowState.actions.continue_with_login_identifier(null);

  useEffect(() => {
    const { inputs } = flowState.actions.continue_with_login_identifier(null);
    if (inputs.email) {
      setIdentifierType("email");
    } else if (inputs.username) {
      setIdentifierType("username");
    } else {
      setIdentifierType("identifier");
    }
  }, [flowState]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    if (searchParams.get("error") == undefined || searchParams.get("error").length === 0) {
      return
    }

    let errorCode = ""
    switch (searchParams.get("error")) {
      case "access_denied":
        errorCode = "thirdPartyAccessDenied"
        break;
      default:
        errorCode = "somethingWentWrong"
        break;
    }

    const error: HankoError = {
      name: errorCode,
      code: errorCode,
      message: searchParams.get("error_description")
    }

    setThirdPartyError(error)

    searchParams.delete("error")
    searchParams.delete("error_description")

    history.replaceState(null, null, window.location.pathname + searchParams.toString())
  }, []);

  return (
    <Fragment>
      <Content>
        <Headline1>{t("headlines.signIn")}</Headline1>
        <ErrorBox state={flowState} error={thirdPartyError} />
        <Form onSubmit={onEmailSubmit} maxWidth>
          {inputs.email ? (
            <Input
              type={"email"}
              autoComplete={"username webauthn"}
              autoCorrect={"off"}
              flowInput={inputs.email}
              onInput={onIdentifierInput}
              value={uiState.email}
              placeholder={t("labels.email")}
              pattern={"^[^@]+@[^@]+\\.[^@]+$"}
            />
          ) : inputs.username ? (
            <Input
              type={"text"}
              autoComplete={"username webauthn"}
              autoCorrect={"off"}
              flowInput={inputs.username}
              onInput={onIdentifierInput}
              value={uiState.username}
              placeholder={t("labels.username")}
            />
          ) : (
            <Input
              type={"text"}
              autoComplete={"username webauthn"}
              autoCorrect={"off"}
              flowInput={inputs.identifier}
              onInput={onIdentifierInput}
              value={uiState.username || uiState.email}
              placeholder={t("labels.emailOrUsername")}
            />
          )}
          <Button uiAction={"email-submit"}>{t("labels.continue")}</Button>
        </Form>
        <Divider hidden={!showDivider}>{t("labels.or")}</Divider>
        {flowState.actions.webauthn_generate_request_options?.(null) &&
        !hidePasskeyButtonOnLogin ? (
          <Form onSubmit={(event) => onPasskeySubmit(event)}>
            <Button
              uiAction={"passkey-submit"}
              secondary
              title={
                !isWebAuthnSupported ? t("labels.webauthnUnsupported") : null
              }
              disabled={!isWebAuthnSupported}
              icon={"passkey"}
            >
              {t("labels.signInPasskey")}
            </Button>
          </Form>
        ) : null}
        {
          flowState.actions.thirdparty_oauth?.(null) ? flowState.actions.thirdparty_oauth(null).inputs.provider.allowed_values?.map((v) => {
            return <Form onSubmit={(event) => onThirdpartySubmit(event, v.value)}>
              <Button
                uiAction={"thirdparty-submit"}
                secondary
                // @ts-ignore
                icon={v.value}
              >
                {t("labels.signInWith", { provider: v.name })}
              </Button>
            </Form>
          }) : null
        }
      </Content>
      <Footer hidden={initialComponentName !== "auth"}>
        <span hidden />
        <Link
          uiAction={"switch-flow"}
          onClick={onRegisterClick}
          loadingSpinnerPosition={"left"}
        >
          {t("labels.dontHaveAnAccount")}
        </Link>
      </Footer>
    </Fragment>
  );
};

export default LoginInitPage;
