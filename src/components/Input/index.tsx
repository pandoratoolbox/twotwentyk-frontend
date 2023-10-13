import React, { useState } from "react";
import { FormWrapper, InputDescWrapper, InputWrapper } from "./styles";
import { InputProps } from "../../types";
import { IconEye } from "../Icons";

export const Input: React.FC<InputProps> = ({
  label,
  onChange,
  type = "text",
  placeholder,
  value,
  id,
  name,
  desc,
  error,
  code,
  currency
}) => {
  const [inputType, setInputType] = useState(type);
  return (
    <FormWrapper>
      {label && <p>{label}</p>}
      <InputWrapper iserror={error} suffix={code ? "code" : type}>
        <input
          type={inputType}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={currency ? `$${value}` : value}
        />
        {type === "password" && (
          <div
            onClick={() =>
              setInputType((prev) => (prev === "text" ? "password" : "text"))
            }
          >
            <IconEye />
          </div>
        )}
        {code && <div className="code">{code}</div>}
        {currency && <div className="currency">{currency}</div>}
      </InputWrapper>
      {error && <span>{error}</span>}
      {desc && <InputDescWrapper>{desc}</InputDescWrapper>}
    </FormWrapper>
  );
};
