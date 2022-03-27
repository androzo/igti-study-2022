import { StyledBox, StyledDivRow, StyledDivTable } from "@/styles/styles";
import React from "react";
import { IExchange } from "services/api";

import ImageWithFallback from "../components/ImageWithFallback";

interface ICardProps {
  card: IExchange;
}

export default function Card(props: ICardProps) {
  const { card } = props;
  return (
    <StyledBox>
      <StyledDivTable>
        <ImageWithFallback
          key={card.id}
          src={card.image}
          fallbackSrc={"/placeholder.png"}
        />
        <StyledDivRow>
          Nome: <strong>{card.name}</strong>
        </StyledDivRow>
        <StyledDivRow>Pais: {card.country}</StyledDivRow>
        <StyledDivRow>Pontuação: {card.trust_score}</StyledDivRow>
        <StyledDivRow>
          Volume de trade (24horas): {card.trade_volume_24h_btc.toFixed(2)}
        </StyledDivRow>
      </StyledDivTable>
    </StyledBox>
  );
}
