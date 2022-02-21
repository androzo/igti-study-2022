import { useState, useEffect } from "react";
import {
  apiGetAllCandidates,
  apiGetAllCities,
  apiGetElection,
} from "../services/apiService";
import Error from "../components/Error";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import Item from "../components/Item";
import CandidateCard from "../components/CandidateCard";
import MainTitle from "../components/MainTitle";
import SelectItem from "../components/SelectItem";
import ElectionBoard from "../components/ElectionBoard";

export default function ElectionsPage() {
  const [errorCities, setErrorCities] = useState("");
  const [errorElection, setErrorElection] = useState("");
  const [errorCandidates, setErrorCandidates] = useState("");
  const [loadingCities, setCitesLoading] = useState(true);
  const [loadingElection, setLoadingElection] = useState(true);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [cities, setCities] = useState("");
  const [candidates, setCandidates] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [election, setElection] = useState("");

  useEffect(() => {
    async function getCities() {
      try {
        const citiesResponse = await apiGetAllCities();
        console.log("Loaded cities...");
        setCities(citiesResponse);
        setCitesLoading(false);
        return citiesResponse;
      } catch {
        setErrorCities("Failed to fetch cities");
      }
    }

    async function getFirstElection(citiesResponse) {
      try {
        const firstElection = await apiGetElection(citiesResponse[0].id);
        setElection(firstElection);
        setSelectedCityName(citiesResponse[0].name);
        console.log("Loaded elections...");
        setLoadingElection(false);
      } catch {
        setErrorElection("Failed to fetch first election");
      }
    }

    async function getCandidates() {
      try {
        const candidateResponse = await apiGetAllCandidates();
        setCandidates(candidateResponse);
        console.log("Loaded candidates...");
        setLoadingCandidates(false);
      } catch {
        setErrorCandidates("Failed to fetch candidates");
      }
    }

    const fetchData = () => {
      getCities().then((citiesResponse) =>
        getFirstElection(citiesResponse).then(getCandidates())
      );
    };

    fetchData();
    setErrorCities("");
    setErrorElection("");
    setErrorCandidates("");
  }, []);

  // hook to update elections info after selected changes
  useEffect(() => {
    async function fetchElectionsById() {
      try {
        console.log("Updating elections...");

        const electionsResponse = await apiGetElection(selectedCityId);
        setElection(electionsResponse.sort((a, b) => b.votes - a.votes));

        setErrorElection("");
        setLoadingElection(false);
      } catch (errorElection) {
        setErrorElection("Could not fetch elections for id: " + selectedCityId);
      }
    }
    fetchElectionsById();
  }, [selectedCityId]);

  // hook to sort candidates by votes
  useEffect(() => {
    if (!loadingElection) {
      let sortedElection = election.sort((a, b) => b.votes - a.votes);
      setElection(sortedElection);
    }
  }, [election]);

  // handle selected city on changes
  function handleOnChange(event) {
    setLoadingElection(true);
    const newCitySelected = cities.find(
      (city) => city.name === event.target.value
    );
    setSelectedCityId(newCitySelected.id);
    setSelectedCityName(newCitySelected.name);
    setLoadingElection(false);
  }

  function loadingScreen(option) {
    return (
      <div className="flex flex-row justify-center mt-8">
        Carregando {option}...
        <Loading />
      </div>
    );
  }

  let mainJsxElection = loadingScreen("eleições");
  let mainJsx = loadingScreen("municipios");

  if (errorCities) {
    mainJsx = <Error>{errorCities}</Error>;
  }

  if (errorElection || errorCandidates) {
    mainJsxElection = <Error>{errorElection}</Error>;
  }

  if (!loadingCities && !loadingElection) {
    mainJsx = (
      <>
        <MainTitle>Escolha o município</MainTitle>
        <SelectItem
          className="shadow-lg rounded-lg"
          name="citiesName"
          onCityChange={handleOnChange}
        >
          {cities.map((city) => {
            return <Item key={city.id}>{city}</Item>;
          })}
        </SelectItem>
      </>
    );
  }

  function getCandidateByElection(election) {
    return candidates.find(
      (candidate) => candidate.id === election.candidateId
    );
  }

  function getCityByElection(election) {
    return cities.find((city) => city.id === election.cityId);
  }

  function getCandidatePercent(votes, presence) {
    return `${((+votes * 100) / +presence).toFixed(2)}%`;
  }

  function checkElected(votes) {
    let allVotes = election.map((e) => e.votes);
    if (votes === Math.max.apply(0, allVotes)) {
      return true;
    } else {
      return false;
    }
  }

  if (!loadingElection) {
    mainJsxElection = (
      <div>
        <ElectionBoard title={selectedCityName} onLoading={loadingElection}>
          {election
            .map((item) => {
              let candidate = getCandidateByElection(item);
              let city = getCityByElection(item);

              return (
                <CandidateCard
                  key={item.id}
                  candidateName={candidate.name}
                  imageName={candidate.username}
                  percentVotes={getCandidatePercent(item.votes, city.presence)}
                  totalVotes={item.votes}
                  electedFlag={checkElected(item.votes)}
                />
              );
            })
            .sort((a, b) => b.votes - a.votes)}
        </ElectionBoard>
      </div>
    );
  }

  return (
    <>
      <Header>react-elections</Header>
      <Main>{mainJsx}</Main>
      <Main>{mainJsxElection}</Main>
    </>
  );
}
