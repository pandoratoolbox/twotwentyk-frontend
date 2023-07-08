import React from "react";
import AppleLogin from "react-apple-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import FacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";
import { AuthDividerWrapper, SocialButtonsWrapper } from "./styles";
import { SocialAuthButton } from "../SocialAuthButton";
import { SocialButtonsGroupProps } from "../../types";
import { useSocialAuth } from "../../hooks/useSocialAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
export const SocialButtonsGroup: React.FC<SocialButtonsGroupProps> = ({
  authType,
}) => {
  const { onGoogleAuthClicked, onAppleAuthClicked, onFacebookAuthClicked } =
    useSocialAuth();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <SocialButtonsWrapper>
      {/* <GoogleLogin
        clientId="620329827727-t3sttbu6556u69ebv50fmt5rda85drp0.apps.googleusercontent.com" // need to change
        buttonText="Login"
        onSuccess={(res) => onGoogleAuthClicked(res, authType)}
        // onFailure={(res) => onGoogleAuthClicked(res, authType)}
        render={(renderProps) => (
          <SocialAuthButton
            authType={authType}
            socialType="Google"
            onClick={renderProps.onClick}
          />
        )}
        cookiePolicy={"single_host_origin"}
        redirectUri="https://twotwentyk.pandoratoolbox.com"
      /> */}
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      /> */}
      <SocialAuthButton
        authType={authType}
        socialType="Google"
        onClick={() => login()}
      />
      <FacebookLogin
        appId="1088597931155576"
        // autoLoad={true}
        fields="name,email,picture"
        callback={(res) => onFacebookAuthClicked(res, authType)}
        render={(renderProps) => (
          <SocialAuthButton
            authType={authType}
            socialType="Facebook"
            onClick={renderProps.onClick}
          />
        )}
      />
      <AppleLogin
        clientId="com.pandoratoolbox.twotwentyk"
        redirectURI="https://twotwentyk.pandoratoolbox.com"
        callback={(res) => onAppleAuthClicked(res, authType)}
        render={(renderProps) => (
          <SocialAuthButton
            authType={authType}
            socialType="Apple"
            onClick={renderProps.onClick}
          />
        )}
      />
      <AuthDividerWrapper>
        <span>Or</span>
      </AuthDividerWrapper>
    </SocialButtonsWrapper>
  );
};
