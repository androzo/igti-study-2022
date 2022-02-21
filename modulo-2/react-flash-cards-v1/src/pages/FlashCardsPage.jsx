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
  const [showTitle, setShowTitle] = useState(true);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);
    setAllCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    setShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    setShowTitle(false);
  }

  return (
    <div>
      <Header>react-flash-cards</Header>
      <Main>
        <div className="text-center m-2 p-2">
          <MyButton onbuttonClick={handleButtonClick}>
            Embaralhar cards
          </MyButton>
          <div className="flex flex-row items-center justify-center space-x-4 m-4">
            <RadioButton
              id="radioButtonShowTitle"
              name="showInfo"
              buttonChecked={showTitle}
              onButtonClick={handleRadioShowTitleClick}
            >
              Mostrar Título
            </RadioButton>
            <RadioButton
              id="radioButtonShowTitleDescription"
              name="showInfo"
              buttonChecked={!showTitle}
              onButtonClick={handleRadioShowDescriptionClick}
            >
              Mostrar Descrição
            </RadioButton>
          </div>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description }) => (
            <FlashCard
              key={id}
              title={title}
              description={description}
              showFlashCardTitle={showTitle}
            />
          ))}
        </FlashCards>
      </Main>
    </div>
  );
}
