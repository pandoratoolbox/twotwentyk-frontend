import React from "react";
import { AppLayout } from "../../layout";
import {
  LearnToPlayWrapper,
  LearnPlaySectionWrap,
  UserDetail,
  ReactionSection,
  VideoSection,
} from "./style";
import { HandsClapIcon, HeartIcon, BookmarkIcon } from "../../components";

export const LearnToPlay: React.FC = () => {
  return (
    <AppLayout>
      <LearnToPlayWrapper>
        <h2>LEARN TO PLAY</h2>
        <LearnPlaySectionWrap>
          <h3>Learn to play with TwentyTwoK</h3>
          <UserDetail>
            <img src="assets/Frame-48096647.png" alt="User" />
            <div className="user-detail">
              <h5>Elizabeth Holland</h5>
              <h6>Published on April 24, 2023.</h6>
            </div>
          </UserDetail>
          <ReactionSection>
            <div className="reactions">
              <div className="reaction hand-clap">
                <HandsClapIcon />
                <span>2.4k</span>
              </div>
              <div className="reaction heart">
                <HeartIcon />
                <span>2.4k</span>
              </div>
            </div>
            <div className="bookmark">
              <BookmarkIcon />
            </div>
          </ReactionSection>
          <VideoSection>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <iframe
              width="853"
              height="480"
              src="https://www.youtube.com/embed/NpEaa2P7qZI"
              title="video placeholder"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoSection>
        </LearnPlaySectionWrap>
      </LearnToPlayWrapper>
    </AppLayout>
  );
};
