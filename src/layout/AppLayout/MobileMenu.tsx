import React, { useEffect, useState } from "react";
import {
  MobileMenuContainer,
  MobileMenuItem,
  MobileMenuNavbar,
  MobileMenuOverlay,
  MobileMenuWrapper,
  MobileSubMenuWrapper,
  MobileSubmenuItem,
} from "./styles";
import { CloseButton } from "../../components/Modals/styles";
import {
  BalanceForWithdrawModal,
  HeaderLogo,
  IconArrowDown,
  WithdrawConfirmModal,
  WithdrawModal,
} from "../../components";
import { headerData } from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyInfoContext } from "../../context";
import { AppHeaderMenuItemProps } from "../../types";

export const MobileMenu: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { myInfoContext } = useMyInfoContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState<string | number>(-1);
  const [currentPath, setCurrentPath] = useState<AppHeaderMenuItemProps>();
  const [balanceModal, setBalanceModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<"success" | "failed">(
    "failed"
  );
  useEffect(() => {
    setCurrentPath(
      headerData.filter(
        (f) => f.to === "/" + location.pathname.split("/")[1]
      )[0]
    );
  }, [location]);

  const handleWithdraw = () => {
    setBalanceModal(false);
    setWithdrawModal(true);
  };

  const handleWithdrawClick = () => {
    onClose();
    setBalanceModal(true);
  };

  const handleConfirmWithdraw = (status?: boolean) => {
    setWithdrawStatus(status ? "success" : "failed");
    setWithdrawModal(false);
    setConfirmModal(true);
  };

  return (
    <React.Fragment>
      <MobileMenuWrapper open={open ? "true" : undefined}>
        <MobileMenuContainer>
          <HeaderLogo />

          <MobileMenuNavbar>
            {headerData?.filter((f) => f.label !== "")
              .map((item, key) => (
                <React.Fragment key={key}>
                  <MobileMenuItem
                    key={key}
                    onClick={
                      item.children
                        ? () => setCollapse((prev) => (prev === key ? -1 : key))
                        : () => navigate(item.to)
                    }
                    active={currentPath?.to === item.to ? "true" : undefined}
                  >
                    {item.label} {item.children && <IconArrowDown />}
                  </MobileMenuItem>
                  {(key === collapse || currentPath?.to === item.to) && (
                    <MobileSubMenuWrapper>
                      {item.children?.map((cItem, cKey) => (
                        <MobileSubmenuItem
                          key={cKey}
                          onClick={() => navigate(`${item.to}/${cItem.to}`)}
                          active={
                            "/" + location.pathname.split("/")[1] === item.to &&
                            location.pathname.split("/")[2] === cItem.to
                              ? "true"
                              : undefined
                          }
                        >
                          {cItem.label}
                        </MobileSubmenuItem>
                      ))}
                    </MobileSubMenuWrapper>
                  )}
                </React.Fragment>
              ))}
            {localStorage.getItem("auth") ? (
              <>
                {" "}
                <MobileMenuItem onClick={handleWithdrawClick}>
                  My Balance
                  <span>
                    $
                    {(myInfoContext?.balance/100).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </MobileMenuItem>
                <MobileMenuItem
                  onClick={() =>
                    setCollapse((prev) =>
                      prev === headerData.length ? -1 : headerData.length
                    )
                  }
                  active={currentPath?.to === "/profile" ? "true" : undefined}
                >
                  {myInfoContext?.username}
                  <IconArrowDown />
                </MobileMenuItem>
                {collapse === headerData.length && (
                  <MobileSubMenuWrapper>
                    {[
                      { label: "Profile", to: "" },
                      { label: "Claims", to: "claims" },
                      { label: "Transactions", to: "transactions" },
                    ].map((cItem, cKey) => (
                      <MobileSubmenuItem
                        key={cKey}
                        onClick={() => navigate("/profile/" + cItem.to)}
                        active={
                          location.pathname.split("/")[2] === cItem.to
                            ? "true"
                            : undefined
                        }
                      >
                        {cItem.label}
                      </MobileSubmenuItem>
                    ))}
                  </MobileSubMenuWrapper>
                )}
              </>
            ) : (
              <MobileMenuItem onClick={() => navigate("/signin")}>
                Log In
              </MobileMenuItem>
            )}
          </MobileMenuNavbar>
        </MobileMenuContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </MobileMenuWrapper>
      <MobileMenuOverlay open={open ? "true" : undefined} onClick={onClose} />
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
    </React.Fragment>
  );
};
