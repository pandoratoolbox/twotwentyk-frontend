import React from "react";
import {
  FeedImage,
  FeedInfoWrapper,
  FeedItemWrapper,
  FeedReadMore,
} from "./styles";
import { IArticle } from "../../models/article";

export const FeedItem: React.FC<IArticle> = ({
  created_at,
  excerpt,
  tags,
  thumbnail_src,
  title,
  url,
}) => {
  return (
    <FeedItemWrapper>
      <FeedImage>
        <img src={thumbnail_src} alt="" />
      </FeedImage>
      <FeedInfoWrapper>
        <h4>{created_at ? new Date(created_at).toDateString() : ""}</h4>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <div>
          {tags?.map((item, key) => (
            <span key={key}>#{item}</span>
          ))}
        </div>
      </FeedInfoWrapper>
      <FeedReadMore>
        <span onClick={() => window.open(url)}>{"Read More >"}</span>
      </FeedReadMore>
    </FeedItemWrapper>
  );
};
