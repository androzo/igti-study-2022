import { useState } from "react";
import MyButton from "../components/MyButton";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import { allFlashCards } from "../data/allFlashCards";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import RadioButton from "../components/RadioButton";

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);
    setAllCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...allCards].map((card) => ({
      ...card,
      showTitle: true,
    }));
    setAllCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...allCards].map((card) => ({
      ...card,
      showTitle: false,
    }));
    setAllCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleOnToggleFlashCard(cardId) {
    const updatedCards = [...allCards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setAllCards(updatedCards);
  }
  return (
    <div>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <div className="text-center m-2 p-2">
          <MyButton onbuttonClick={handleButtonClick}>
            Embaralhar cards
          </MyButton>
          <div className="flex flex-row items-center justify-center space-x-4 m-4">
            <RadioButton
              id="radioButtonShowTitle"
              name="showInfo"
              buttonChecked={radioButtonShowTitle}
              onButtonClick={handleRadioShowTitleClick}
            >
              Mostrar Título
            </RadioButton>
            <RadioButton
              id="radioButtonShowTitleDescription"
              name="showInfo"
              buttonChecked={!radioButtonShowTitle}
              onButtonClick={handleRadioShowDescriptionClick}
            >
              Mostrar Descrição
            </RadioButton>
          </div>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description, showTitle }) => (
            <FlashCard
              id={id}
              key={id}
              title={title}
              description={description}
              showFlashCardTitle={showTitle}
              onToggleFlashCard={handleOnToggleFlashCard}
            />
          ))}
        </FlashCards>
      </Main>
    </div>
  );
}
