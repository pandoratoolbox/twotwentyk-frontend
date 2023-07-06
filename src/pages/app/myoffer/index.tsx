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
import { Button, MarketCard } from "../../../components";
import { useNavigate } from "react-router-dom";

export const MyOfferPage: React.FC = () => {
  const navigate = useNavigate();
  const [isView, setIsView] = useState(false);
  const { myOfferContext } = useMyOfferContext();
  return (
    <AppLayout>
      {myOfferContext?.length > 0 ? (
        <DatesPageWrapper isview={isView ? "true" : undefined}>
          <DatePageContainer>
            <DatePageTitleWrapper>
              <h3>My Offers</h3>
            </DatePageTitleWrapper>
            <CardGridWrapper>
              {myOfferContext
                ?.filter((f: any) => f.status === 0)
                .map((item: any, key: number) => (
                  <MarketCard
                    // {...cardData[key]}
                    key={key}
                    {...item}
                    onCard={() => setIsView(true)}
                  />
                ))}
            </CardGridWrapper>
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
    </AppLayout>
  );
};
