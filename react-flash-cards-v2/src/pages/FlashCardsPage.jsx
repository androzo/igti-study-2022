import { useState, useEffect } from "react";
import MyButton from "../components/MyButton";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import { apiGetAllFlashCards } from "../services/apiService";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import RadioButton from "../components/RadioButton";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FlashCardItem from "../components/FlashCardItem";
import FlashCardForm from "../components/FlashCardForm";

export default function FlashCardsPage() {
  // back end
  const [allCards, setAllCards] = useState([]);

  // para estudo
  const [studyCards, setStudyCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  // back end
  useEffect(() => {
    // promise
    // apiGetAllFlashCards().then((allFlashCards) => {
    //   setAllCards(allFlashCards);
    // });

    // jeito do pssor

    // async function getAllCards() {
    //   const backEndAllCards = await apiGetAllFlashCards();
    //   setAllCards(backEndAllCards);
    // }
    // getAllCards();

    // IIFE
    (async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    })();
  }, []);

  // exclusivo para estudo
  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleOnToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  function handleOnDeleteFlashCard(cardId) {
    setAllCards(allCards.filter((card) => card.id !== cardId));
  }

  function handleEditFlashCard(card) {
    console.log(card);
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleTabSelect(tabIndex) {
    if (tabIndex !== 1) {
      setCreateMode(true);
    }
    setSelectedTab(tabIndex);
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (!!error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map((flashCard) => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleOnDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div className="my-4">
              <MyButton onClick={handleNewFlashCard}>Criar</MyButton>
            </div>
            <FlashCardForm createMode={createMode}></FlashCardForm>
          </TabPanel>
          <TabPanel>
            <div className="text-center m-2 p-2">
              <MyButton onClick={handleShuffle}>Embaralhar cards</MyButton>
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
              {studyCards.map(({ id, title, description, showTitle }) => (
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <div>
      <Header>react-flash-cards-v2</Header>

      <Main>{mainJsx}</Main>
    </div>
  );
}
