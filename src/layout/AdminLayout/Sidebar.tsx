import React, { useEffect } from "react";
import { AdminSidebarWrapper, IconWrapper, SidebarItemWrapper } from "./styles";
import { IconCollection } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    label: "Collection Creation",
    to: "/admin/collection-creation",
  },
  {
    label: "Claim Management",
    to: "/admin/claim-management",
  },
  {
    label: "User Management",
    to: "/admin/user-management",
  },
];

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <AdminSidebarWrapper>
      {sidebarItems.map((item, key) => (
        <SidebarItemWrapper key={key} onClick={() => navigate(item.to)}>
          <IconWrapper>
            <IconCollection />
          </IconWrapper>
          <p
            style={{
              color: item.to === location.pathname ? "#0EA5E9" : "#64748B",
            }}
          >
            {item.label}
          </p>
        </SidebarItemWrapper>
      ))}
    </AdminSidebarWrapper>
  );
};
