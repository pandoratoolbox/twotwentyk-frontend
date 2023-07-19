import React, { useEffect, useState } from "react";
import {
  Badge,
  HeaderButton,
  HeaderButtonGroup,
  HeaderMenuWrapper,
  HeaderNavItem,
  HeaderWrapper,
  MainHeaderContainer,
  MainHeaderWrapper,
  MobileMenuButton,
  NotificationButtonWrapper,
  SubHeaderContainer,
  SubHeaderWrapper,
  SubMenuItem,
} from "./styles";
import {
  BalanceForWithdrawModal,
  Button,
  HeaderLogo,
  IconAlarm,
  IconCoins,
  IconLogout,
  IconMenu,
  IconProfile,
  WithdrawConfirmModal,
  WithdrawModal,
} from "../../components";
import { headerData } from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import { AppHeaderMenuItemProps } from "../../types";
import { Notification } from "./Notification";
import { useMyInfoContext } from "../../context";
import { MobileMenu } from "./MobileMenu";

export const Header: React.FC = () => {
  const { myInfoContext } = useMyInfoContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const [balanceModal, setBalanceModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<"success" | "failed">(
    "failed"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<AppHeaderMenuItemProps>();
  // const [currentUser, setCurrentUser] = useState<string | null>("");

  useEffect(() => {
    setCurrentPath(
      headerData.filter(
        (f) => f.to === "/" + location.pathname.split("/")[1]
      )[0]
    );
  }, [location]);

  const handleWithdraw = () => {
    setBalanceModal(false);
    // setWithdrawModal(true);
    setConfirmModal(true);
  };

  const handleWithdrawClick = () => {
    setBalanceModal(true);
  };

  const handleConfirmWithdraw = (status?: boolean) => {
    setWithdrawStatus(status ? "success" : "failed");
    // setWithdrawModal(false);
    setConfirmModal(true);
  };

  return (
    <>
      <MobileMenu onClose={() => setIsOpen(false)} open={isOpen} />
      <HeaderWrapper>
        <MainHeaderWrapper>
          <MainHeaderContainer>
            <HeaderLogo />
            <HeaderMenuWrapper>
              {headerData
                .filter((f) => f.label !== "")
                .map((item, key) => (
                  <HeaderNavItem
                    key={key}
                    to={item.to}
                    active={currentPath?.to === item.to ? "true" : undefined}
                  >
                    {item.label}
                  </HeaderNavItem>
                ))}
            </HeaderMenuWrapper>
            {localStorage.getItem("auth") ? (
              <HeaderButtonGroup>
                <HeaderButton width={124} onClick={handleWithdrawClick}>
                  <IconCoins />
                  <span>
                    $
                    {myInfoContext && (myInfoContext?.balance / 100).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </HeaderButton>
                <HeaderButton
                  width={124}
                  className={currentPath?.to === "/profile" ? "active" : ""}
                  onClick={() => navigate("/profile/")}
                >
                  <IconProfile />
                  <span>{myInfoContext?.username}</span>
                </HeaderButton>
                <NotificationButtonWrapper>
                  <HeaderButton onClick={() => setNotification(true)}>
                    <IconAlarm />
                    <Badge>5</Badge>
                  </HeaderButton>
                  <Notification
                    open={notification}
                    onClose={() => setNotification(false)}
                  />
                </NotificationButtonWrapper>
              </HeaderButtonGroup>
            ) : (
              <HeaderButtonGroup>
                <HeaderButton
                  className="login-button"
                  onClick={() => navigate("/signin")}
                >
                  <IconLogout />
                  <span>Log In</span>
                </HeaderButton>
              </HeaderButtonGroup>
            )}
            <MobileMenuButton onClick={() => setIsOpen(true)}>
              <HeaderButton>
                <IconMenu />
              </HeaderButton>
            </MobileMenuButton>
          </MainHeaderContainer>
        </MainHeaderWrapper>
        {currentPath?.children && (
          <SubHeaderWrapper>
            <SubHeaderContainer id="submenu">
              {currentPath?.children.map((item, key) => (
                <SubMenuItem
                  key={key}
                  to={currentPath.to + "/" + item.to}
                  active={
                    location.pathname.split("/")[2] === item.to
                      ? "true"
                      : undefined
                  }
                >
                  {item.label}
                </SubMenuItem>
              ))}
            </SubHeaderContainer>
          </SubHeaderWrapper>
        )}
      </HeaderWrapper>
      <BalanceForWithdrawModal
        onClose={() => setBalanceModal(false)}
        open={balanceModal}
        onWithdraw={handleWithdraw}
      />
      <WithdrawModal
        onClose={() => setWithdrawModal(false)}
        open={withdrawModal}
        onWithdraw={handleConfirmWithdraw}
      />
      <WithdrawConfirmModal
        status={withdrawStatus}
        onClose={() => setConfirmModal(false)}
        open={confirmModal}
      />
    </>
  );
};
