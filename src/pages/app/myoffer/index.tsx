import React, { useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import {
  DatePageContainer,
  DatePageTitleWrapper,
  DatesPageWrapper,
  EmptyCards,
} from "../category/styles";
import { CardGridWrapper } from "../../../components/Modals/styles";
import { useMyOfferContext } from "../../../context";
import { Button, IconArrowDown, MarketCard } from "../../../components";
import { useNavigate } from "react-router-dom";
import { ViewOfferSection } from "../../../modules/app/dates/ViewOfferSection";
import {
  CardWrapper,
  OfferHistoryCard,
  OfferHistoryCardGrid,
  OfferStatus,
  OfferTabWrapper,
  ViewOfferInfoWrapper,
} from "./styles";
import {
  PropertiesContent,
  PropertiesHeader,
  PropertiesWrapper,
  PropertyItem,
} from "../../../modules/app/dates/styles";

export const MyOfferPage: React.FC = () => {
  const navigate = useNavigate();
  const [isView, setIsView] = useState(false);
  const { myOfferContext } = useMyOfferContext();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [tab, setTab] = useState<"new" | "history">("new");
  const [collapse, setCollapse] = useState(-1);
  return (
    <AppLayout>
      {myOfferContext?.length > 0 ? (
        <DatesPageWrapper isview={isView ? "true" : undefined}>
          <DatePageContainer>
            <DatePageTitleWrapper>
              <h3>My Offers</h3>
            </DatePageTitleWrapper>
            <OfferTabWrapper>
              <span
                className={tab === "new" ? "active" : ""}
                onClick={() => setTab("new")}
              >
                New
              </span>
              <span
                className={tab === "history" ? "active" : ""}
                onClick={() => setTab("history")}
              >
                History
              </span>
            </OfferTabWrapper>
            {tab === "new" ? (
              <CardGridWrapper>
                {myOfferContext
                  ?.filter((f: any) => f.status === 0)
                  .map((item: any, key: number) => (
                    <MarketCard
                      // {...cardData[key]}
                      key={key}
                      {...item}
                      onCard={() => {
                        setIsView(true);
                        setSelectedItem(item);
                      }}
                    />
                  ))}
              </CardGridWrapper>
            ) : (
              <OfferHistoryCardGrid>
                {myOfferContext
                  .filter((f: any) => f.status !== 0)
                  .map((item: any, key: number) => (
                    <OfferHistoryCard key={key}>
                      <CardWrapper>
                        <MarketCard
                          // {...cardData[key]}
                          {...item}
                        />
                      </CardWrapper>
                      <ViewOfferInfoWrapper>
                        <div>
                          <b>By {item.buyer}</b>
                          <p>{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <h1>$1,000 USD</h1>
                      </ViewOfferInfoWrapper>
                      <PropertiesWrapper>
                        <PropertiesHeader onClick={() => setCollapse(item.id)}>
                          <span>Card Properties</span>
                          <IconArrowDown />
                        </PropertiesHeader>
                        {collapse === item.id && (
                          <PropertiesContent>
                            <PropertyItem>
                              <p>Rarity</p>
                              <span>Rare</span>
                            </PropertyItem>
                            <PropertyItem>
                              <p>Type</p>
                              <span>Year</span>
                            </PropertyItem>
                            <PropertyItem>
                              <p>Year</p>
                              <span>2023</span>
                            </PropertyItem>
                            <PropertyItem>
                              <p>Collection</p>
                              <span>Sports Series</span>
                            </PropertyItem>
                          </PropertiesContent>
                        )}
                      </PropertiesWrapper>
                      <OfferStatus
                        className={item.status === 1 ? "approved" : "denied"}
                      >
                        {item.status === 1 && "Approved"}
                        {item.status === 2 && "Denied"}
                      </OfferStatus>
                    </OfferHistoryCard>
                  ))}
              </OfferHistoryCardGrid>
            )}
          </DatePageContainer>
        </DatesPageWrapper>
      ) : (
        <EmptyCards>
          <h3>No Cards</h3>
          <p>It looks like you don’t have any cards to offer.</p>
          <Button
            className="buy-button"
            onClick={() => navigate("/marketplace")}
          >
            Go to Marketplace
          </Button>
        </EmptyCards>
      )}
      <ViewOfferSection
        isView={isView}
        item={selectedItem}
        onClose={() => {
          setIsView(false);
          setSelectedItem(null);
        }}
      />
    </AppLayout>
  );
};
