import React from "react";
import { NotificationItemWrapper, NotificationTitleWrapper } from "./styles";
import { NotificationItemProps } from "../../types";

export const NotificationItem: React.FC<NotificationItemProps> = ({
  date,
  desc,
  isNew,
  title,
}) => {
  return (
    <NotificationItemWrapper>
      {/* {isNew && <span>New</span>} */}
      <div className="notify-img">
        <img src="/assets/notification.png" alt="" />
      </div>
      <div>
        <NotificationTitleWrapper>
          <h5>
            <b>{title}</b> <p>{date}</p>
          </h5>
        </NotificationTitleWrapper>
        <p>{desc}</p>
      </div>
    </NotificationItemWrapper>
  );
};
