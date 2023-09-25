import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  ForgotPasswordText,
  FormActionText,
  FormActionWrapper,
  AuthFormWrapper,
} from "./styles";
import {
  AuthFormGroup,
  AuthFormTitle,
  Button,
  Input,
  SocialButtonsGroup,
} from "../../components";
import { signinFormValidation } from "../../utils";
import { signin } from "../../actions";
import api from "../../config/api";

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({ email: "", password: "" });
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSignIn = async () => {
    const { isValid, errors } = signinFormValidation(form);
    setError(errors);

    if (isValid) {
      try {
        const response = await api.post("/auth/login", {
          username: form.email,
          password: form.password,
        });

        const { data } = response;
        if (data) {
          localStorage.setItem("auth", data.token);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.token}`;
          navigate("/dashboard");
        } else {
          // toast.error(data.message);
        }
      } catch (error: any) {
        console.error('An error occurred:', error.response.data);
        // toast.error(error.response.data)
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AuthFormWrapper>
      <AuthFormTitle>Log In</AuthFormTitle>
      <SocialButtonsGroup authType="Login" />
      <AuthFormGroup>
        <Input
          label="Email Address"
          onChange={handleChange}
          name="email"
          value={form.email}
          error={error.email}
          placeholder="e.g moulee@example.com"
        />
        <Input
          label="Password"
          onChange={handleChange}
          name="password"
          value={form.password}
          error={error.password}
          type="password"
          placeholder="Enter password"
        />
      </AuthFormGroup>
      <ForgotPasswordText>
        <Link to="/forgot-password">Forgot Password</Link>
      </ForgotPasswordText>
      <FormActionWrapper>
        <Button onClick={handleSignIn}>Enter</Button>
        <FormActionText>
          {"Don’t have an account? "} <Link to={"/signup"}>Sign Up Now</Link>
        </FormActionText>
      </FormActionWrapper>
    </AuthFormWrapper>
  );
};
