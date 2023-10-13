import React, { useEffect, useRef } from "react";
import { CloseButton, NotificationWrapper, NotificationsGroup } from "./styles";
import { notifications } from "./data";
import { NotificationItem } from "../../components/NotificationItem";
import { NotificationProps } from "../../types";
import moment from "moment";
import api from "../../config/api";

export const Notification: React.FC<NotificationProps> = ({
  onClose,
  open,
  data,
  onClear,
}) => {
  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearAll = async () => {
    await api.delete("/me/notification");
    onClear();
  };

  return (
    <NotificationWrapper ref={wrapperRef} open={open}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h3>Notifications</h3>
      <NotificationsGroup>
        {data.map((item, key) => (
          <NotificationItem
            date={moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
            desc={
              item.payload.status === 1
                ? `The trigger ${item.payload.nft_trigger?.trigger} has come true for ${item.payload.nft_prediction?.nft_identity?.celebrity_name}`
                : `Your claim ${item.payload.nft_trigger?.trigger} for ${item.payload.nft_prediction?.nft_identity?.celebrity_name} was denied because we determined the event did not happen`
            }
            title={
              item.payload.status === 1
                ? "Your Prediction Came True"
                : "Your claim was denied"
            }
            isNew={!item.is_read}
            key={key}
          />
        ))}
      </NotificationsGroup>

      <p>
        <a onClick={handleClearAll}>Clear All</a>
      </p>
    </NotificationWrapper>
  );
};
