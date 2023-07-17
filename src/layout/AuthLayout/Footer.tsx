import React from "react";
import { FooterDesc, FooterLogo, FooterWrapper } from "./style";

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterLogo>
        <img src="/assets/footer-logo.png" alt="" />
      </FooterLogo>
      <FooterDesc>
        <p>POWERED BY</p>
        <img src="/assets/footer-gameon.png" alt="" />
      </FooterDesc>
    </FooterWrapper>
  );
};
