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
import api from "../../config/api";
export const SocialButtonsGroup: React.FC<SocialButtonsGroupProps> = ({
  authType,
}) => {
  const { onGoogleAuthClicked, onAppleAuthClicked, onFacebookAuthClicked } =
    useSocialAuth();

  const handleAppleAuth = (res: any) => {
    // POST /auth/social { platform: "apple", token: "token" }
    // if (resp.data.token) {
    //   localStorage.setItem("auth", resp.data.token)
    // }
    console.log(res);
  };

  const handleGoogleAuth = async (res: any) => {
    console.log(res);
    let resp = await api.post("/auth/google", {id_token: res.credential})
    console.log(resp)
    localStorage.setItem("token", res.data.token)
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: () => console.log("Login Failed"),
  });

  return (
    <SocialButtonsWrapper>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        
      /> */}
      <SocialAuthButton
        authType={authType}
        socialType="Google"
        onClick={() => login()}
      />
      {/* <FacebookLogin
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
      />  */}
      <AppleLogin
      usePopup={true}
        clientId="com.pandoratoolbox.twotwentyk"
        redirectURI="https://twotwentyk.pandoratoolbox.com"
        callback={(res) => handleAppleAuth(res)}
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
