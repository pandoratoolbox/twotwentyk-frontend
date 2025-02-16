import { styled } from "styled-components";

//  background: ${({ bg }) =>
//     bg
//       ? `url(${bg}) no-repeat, #CDCDCD`
//       : "linear-gradient(0deg, #CDCDCD, #CDCDCD), url(.png), #FFFFFF"};

export const CardWrapper = styled.div`
  padding: 23px 25px;
  cursor: pointer;
  position: relative;
  width: 100%;
  /* background-blend-mode: luminosity, normal; */
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  &:hover {
    .overlay {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const CardImgWrapper = styled.div<{
  dashbordstyle?: boolean;
  rarity?: number;
}>`
  position: relative;
  display: flex;
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
  .info-nft {
    position: relative;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    h2,
    h3,
    h4 {
      text-shadow: 1px 1px 2px black;
      &.Rare {
        color: #2911a4;
      }
      &.Core {
        color: white;
      }
      &.Uncommon {
        color: #e6b964;
      }
    }
    &.info-nft-day-month {
      top: 50%;
      &.crafting {
        h2 {
          font-size: clamp(1.3rem, 2vw, 1.6rem);
        }
        h3 {
          font-size: clamp(0.7em, 2vw, 0.8rem);
        }
      }
    }
    &.info-nft-prediction {
      top: 43%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      img {
        width: 4vw;
        margin: 0 auto;
      }
      h4 {
        font-size: ${({ dashbordstyle }) =>
          dashbordstyle
            ? "clamp(0.6rem, 2vw, 0.8rem)"
            : "clamp(0.8rem, 2vw, 1rem)"};
      }
      @media screen and (max-width: 1024px) {
        img {
          width: 15vw;
        }
      }
    }
    &.info-nft-identity {
      top: 50%;

      img {
        width: 80%;
      }
      .nft-info-detail {
        position: absolute;
        bottom: 0;
        width: 100%;
        h2 {
          font-size: clamp(1.5rem, 2vw, 2rem);
        }
        h3 {
          font-size: clamp(0.8rem, 2vw, 1rem);
        }
      }
      @media screen and (max-width: 1024px) {
        img {
          width: 30vw;
        }
      }
    }

    &.info-nft-trigger {
      bottom: 15%;
      width: 75%;
      h4 {
        font-size: clamp(0.6rem, 2vw, 0.8rem);
      }
    }
    &.info-nft-cardPack {
      top: 50%;
    }
  }
`;

export const CardTopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CardBottomSection = styled.div`
  height: 37px;
  width: 100%;
  border-radius: 4px;
  background: #000;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.2);
  margin-top: 12px;
  /* background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.08) 18.23%,
    rgba(0, 0, 0, 0.35) 51.56%,
    rgba(0, 0, 0, 0.8) 100%
  ); */
  color: #fff;
  padding: 14px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 4px;
  }
  p {
    color: #fff;
    font-family: vipnagorgialla;
    font-size: 12px;
    font-weight: 100;
    line-height: 100%; /* 12px */
    text-transform: uppercase;
  }
`;

export const CardOverlay = styled.div`
  opacity: 0;
  visibility: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(11, 11, 11, 0.6); */
  background: url("/assets/nfts/blur.png") no-repeat;
  background-size: 100% 100%;
  backdrop-filter: blur(2px);
  /* border-radius: 8px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > :not(:first-child) {
    margin-top: 12px;
  }
`;

export const Rarity = styled.div`
  height: 32px;
  background: url("/assets/nfts/rarity.png") no-repeat;
  background-size: 100% 100%;
  min-width: 81px;
  display: flex;
  font-family: "IBM Plex Mono", monospace;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 11px;
  right: 11px;
  color: #fff;
  padding: 0 13px;
  /* background: #615e5e; */

  @media (min-width: 425px) {
    max-width: 60px !important;
  }
`;

export const StatusWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0px;
  & > * {
    margin-top: 8px;
    padding: 0 7px;
    height: 23px;
    border-radius: 0 4px 4px 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    width: fit-content;
  }
  p {
    background-color: rgba(255, 255, 255, 0.8);
    color: #000;
  }
  span {
    color: #000;
    border-radius: 0px 4px 4px 0px;
    background: rgba(255, 255, 255, 0.7);
  }
`;
