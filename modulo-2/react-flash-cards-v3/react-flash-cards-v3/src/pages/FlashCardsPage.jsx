import { useEffect, useState } from "react";

import { GrAdd as NewIcon } from "react-icons/gr";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { helperShuffleArray } from "../helpers/arrayHelpers";

import {
  apiGetAllFlashCards,
  apiCreateFlashCard,
  apiUpdateFlashCard,
  apiDeleteFlashCard,
} from "../services/apiService";

import Button from "../components/Button";
import Error from "../components/Error";
import FlashCard from "../components/FlashCard";
import FlashCardItem from "../components/FlashCardItem";
import FlashCards from "../components/FlashCards";
import Form from "../components/Form";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FlashCardsPage() {
  /**
   * Flash cards vindos do Back End. Virou state
   * porque poderá sofrer alterações (CRUD)
   */
  const [allCards, setAllCards] = useState([]);

  /**
   * Cópia dos flash cards do Back End com um
   * atributo adicional - showTitle (true/false).
   * É utilizado na aba "Estudo"
   */
  const [studyCards, setStudyCards] = useState([]);

  /**
   * Indicador de carregamento dos dados
   */
  const [loadingCards, setLoadingCards] = useState(true);

  /**
   * Indicador de erro no app. Utilizado nas
   * requisições ao Back End
   */
  const [error, setError] = useState("");

  /**
   * Indicador se os flash cards de estudo devem mostrar
   * título ou descrição. Uma vez definido, se aplica
   * a todos os cards
   */
  const [studyShowTitle, setStudyShowTitle] = useState(true);

  /**
   * Indicador de inserção (true) ou edição (false) de dados
   */
  const [createMode, setCreateMode] = useState(true);

  /**
   * Indicador da aba visível ao usuário. Começa na
   * primeira aba (0)
   */
  const [currentTab, setCurrentTab] = useState(0);

  /**
   * Indicador do flash card selecionado. Utilizado
   * para lógica de edição de dados
   */
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  /**
   * Effect para sincronizar os dados do Back End
   * e indicar que os mesmos não estão mais sendo
   * carregados
   */
  useEffect(() => {
    /**
     * Técnica para async/await em useEffect:
     * Criação da função dentro do useEffect
     * e posterior invocação da mesma
     */
    async function getAllFlashCards() {
      try {
        const cards = await apiGetAllFlashCards();
        setAllCards(cards);

        /**
         * Simulando um atraso maior
         * na requisição para percebermos
         * o componente <Loading />
         */
        setTimeout(() => {
          setError("");
          setLoadingCards(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllFlashCards();
  }, []);

  /**
   * Effect para monitorar os cards principais,
   * sincronizando com os study cards e o
   * card selecionado automaticamente
   */
  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
    setStudyShowTitle(true);
    setSelectedFlashCard(null);
  }, [allCards]);

  /**
   * Função que lida com o clique no botão
   * de embaralhamento de cards (aba "Estudo")
   */
  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  /**
   * Função "privada" utilizada por handleStudyShowDescription
   * e handleStudyShowTitle, como forma de abstração.
   *
   * PS: é comum começarmos funções privadas com _
   *
   * Neste contexto, uma função privada define uma
   * função que não é invocada diretamente pelos
   * componentes, é uma função auxiliar dos "handles"
   */
  function _toggleShowTitleOrDescription(showTitle) {
    /**
     * Transformamos os dados para que todos os
     * cards mostrem title ou descrição (conforme o parâmetro)
     */
    // prettier-ignore
    const updatedStudyCards = 
      [...studyCards].map(card => ({...card, showTitle}));

    setStudyCards(updatedStudyCards);
    setStudyShowTitle(showTitle);
  }

  /**
   * Função que lida com o clique no Radio Button
   * de "Mostrar descrição" nos cards da aba "Estudo"
   */
  function handleStudyShowDescription() {
    _toggleShowTitleOrDescription(false);
  }

  /**
   * Função que lida com o clique no Radio Button
   * de "Mostrar título" nos cards da aba "Estudo"
   */
  function handleStudyShowTitle() {
    _toggleShowTitleOrDescription(true);
  }

  /**
   * Função que lida com o clique no flash card
   * de estudos, que faz a troca de exibição
   * entre título e descrição
   */
  function handleToggleFlashCard(cardId) {
    // const updatedStudyCards = [...studyCards];
    // const cardIndex = updatedStudyCards.findIndex(card => card.id === cardId);

    // updatedStudyCards[cardIndex].showTitle =
    //   !updatedStudyCards[cardIndex].showTitle;

    setStudyCards(
      studyCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, showTitle: !card.showTitle };
        }

        return card;
      })
    );
  }

  /**
   * Função que lida com o clique
   * no botão "Novo flash card"
   */
  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  /**
   * Função que lida com o clique
   * em algum dos botões de edição
   * do flash card (aba "Listagem")
   */
  function handleEditFlashCard(flashCard) {
    setCreateMode(false);
    setCurrentTab(1);
    setSelectedFlashCard(flashCard);
  }

  /**
   * Função que lida com a troca
   * de abas que pode ser feita pelo usuário
   */
  function handleChangeTab(selectedTab) {
    setCurrentTab(selectedTab);
  }

  /**
   * Função assíncrona que trata a exclusão de um
   * flash card. Faz primeiramente a exclusão no
   * Back End e, em caso de sucesso, faz a exclusão
   * no Front End
   */
  async function handleDeleteFlashCard(cardId) {
    try {
      /**
       * Back End
       */
      await apiDeleteFlashCard(cardId);

      /**
       * Front End
       */
      setError("");
      setAllCards(allCards.filter((card) => card.id !== cardId));
      toast.success("Card excluido com sucesso");
    } catch (error) {
      setError(error.message);
    }
  }

  /**
   * Função que efetua a inclusão de um novo flash card.
   * Primeiramente, é feita a inclusão no Back End e, em
   * seguida, a inclusão é feita no Front End
   */
  async function createNewFlashCard({ title, description }) {
    try {
      /**
       * Back End
       */
      const newCardFromBackEnd = await apiCreateFlashCard({
        title,
        description,
      });

      /**
       * Front End
       */
      /**
       * Este tipo se "set" é menos comum, mas útil em alguns casos.
       * É feito com função, onde o parâmetro é o valor atual de allCards
       */
      setAllCards((currentCards) => [
        ...currentCards,
        { ...newCardFromBackEnd },
      ]);
      setError("");
      toast.success(`Card ${title} criado com sucesso!`);
    } catch (error) {
      setError(error.message);
    }
  }

  /**
   * Função que efetua a edição de um flash card existente.
   * Primeiramente, é feita a edição no Back End e, em
   * seguida, a edição é feita no Front End. Obtemos o id
   * através de "selectedFlashCard"
   */
  async function updateExistingFlashCard({ title, description }) {
    try {
      /**
       * Back End
       */
      await apiUpdateFlashCard({
        id: selectedFlashCard.id,
        title,
        description,
      });

      /**
       * Front End
       */
      setAllCards(
        allCards.map((card) => {
          if (card.id === selectedFlashCard.id) {
            return { ...card, title, description };
          }

          return card;
        })
      );
      setError("");
      toast.success(`Card ${title} atualizado com suceso!`);
    } catch (error) {
      setError(error.message);
    }
  }

  /**
   * Função "orquestradora" que define se será
   * feita a inclusão ou a edição de um flash card,
   * com base em "createMode"
   */
  function handlePersistFlashCard({ title, description }) {
    if (createMode) {
      createNewFlashCard({ title, description });
      return;
    }

    // Edição
    updateExistingFlashCard({ title, description });
  }

  /**
   * Assumi que o JSX principal é o componente
   * de indicador de carregamento
   */
  let mainJsx = (
    <div className="flex flex-row justify-center mt-8">
      <Loading />
    </div>
  );

  /**
   * Se há erro a ser exibido, o JSX exibe
   * somente esse erro
   */
  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  /**
   * Layout principal do app, onde não há erro
   * e os dados já foram carregados
   */
  if (!loadingCards) {
    mainJsx = (
      <>
        <Tabs selectedIndex={currentTab} onSelect={handleChangeTab}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            <h2 className="font-semibold text-center mb-4 text-xl">
              {allCards.length} flash card(s) cadastrado(s)
            </h2>

            {allCards.map((flashCard) => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onEdit={handleEditFlashCard}
                  onDelete={handleDeleteFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <Button
              colorClass="bg-green-100"
              extraClasses="font-semibold mb-4"
              onButtonClick={handleNewFlashCard}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <NewIcon size={24} /> <span>Novo flash card</span>
              </div>
            </Button>

            <Form
              title={`${createMode ? "Criação" : "Manutenção"} de Flash Card`}
              isCreate={createMode}
              onFormSubmit={handlePersistFlashCard}
            >
              {selectedFlashCard}
            </Form>
          </TabPanel>

          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
            </div>

            <div className="flex flex-row items-center justify-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={studyShowTitle}
                onButtonClick={handleStudyShowTitle}
              >
                Mostrar título
              </RadioButton>

              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!studyShowTitle}
                onButtonClick={handleStudyShowDescription}
              >
                Mostrar descrição
              </RadioButton>
            </div>

            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  /**
   * Retorno deste componente, sendo que o conteúdo de
   * "mainJsx" é bastante dinâmico devido às regras acima
   */
  console.log(process.env.NODE_ENV);
  return (
    <>
      <ToastContainer></ToastContainer>
      <Header>react-flash-cards-v3</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
