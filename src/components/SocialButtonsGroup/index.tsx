import React, { useEffect, useRef } from "react";
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const SocialButtonsGroup: React.FC<SocialButtonsGroupProps> = ({
  authType,
}) => {
  const GOOGLE_CLIENT_ID =
    "620329827727-t3sttbu6556u69ebv50fmt5rda85drp0.apps.googleusercontent.com";
  const APPLE_CLIENT_ID = "com.pandoratoolbox.twotwentyk";
  const { onGoogleAuthClicked, onAppleAuthClicked, onFacebookAuthClicked } =
    useSocialAuth();

  const handleAppleAuth = async (res: any) => {
    console.log(res);
    try {
      let resp = await api.post("/auth/apple", { id_token: res.id_token });
      console.log(resp);
      if (resp) {
        if (resp.data.token) {
          localStorage.setItem("auth", resp.data.token);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${resp.data.token}`;
          navigate("/dashboard");
        } else {
          throw "No token in API response";
        }
      }
    } catch (e: any) {
      toast.error(e);
    }
  };

  const navigate = useNavigate();

  const handleGoogleAuth = async (res: any) => {
    console.log(res);
    try {
      let resp = await api.post("/auth/google", { id_token: res.credential });
      console.log(resp);
      if (resp) {
        if (resp.data.token) {
          localStorage.setItem("auth", resp.data.token);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${resp.data.token}`;
          navigate("/dashboard");
        } else {
          throw "No token in API response";
        }
      }
    } catch (e: any) {
      toast.error(e);
    }
  };

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  //   onError: () => console.log("Login Failed"),
  // });

  const loadScript = (
    src: string,
    id: string,
    onload: () => void = () => {}
  ) => {
    const existingScript = document.getElementById(id);

    if (existingScript != null) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.defer = true;
    script.async = true;
    script.onload = onload;

    document.head.appendChild(script);
  };

  const handleGoogleClick = () => {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleAuth,
      ux_mode: "redirect",
    });

    google.accounts.id.prompt();
  };

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
        onClick={handleGoogleClick}
      />
      <FacebookLogin
        appId="1206500170741412"
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
        usePopup={true}
        clientId={APPLE_CLIENT_ID}
        redirectURI="https://twotwentyk.pandoratoolbox.com"
        callback={(res) => handleAppleAuth(res)}
        responseType="id_token"
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
