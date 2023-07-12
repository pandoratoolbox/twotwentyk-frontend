import React from "react";
import {
  AdminContentWrapper,
  AdminLayoutContainer,
  AdminLayoutWrapper,
} from "./styles";
import { AdminHeader } from "./Header";
import { AdminSidebar } from "./Sidebar";

export const AdminLayout: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <AdminLayoutWrapper>
      <AdminHeader />
      <AdminLayoutContainer>
        <AdminSidebar />
        <AdminContentWrapper>
          <div>{children}</div>
        </AdminContentWrapper>
      </AdminLayoutContainer>
    </AdminLayoutWrapper>
  );
};
