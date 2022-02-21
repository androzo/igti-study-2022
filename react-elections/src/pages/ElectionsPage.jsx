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
import Election from "../components/Election";

export default function ElectionsPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingElection, setLoadingElection] = useState(true);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [cities, setCities] = useState("");
  const [candidates, setCandidates] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [election, setElection] = useState("");

  useEffect(() => {
    async function fetchInitialData() {
      const citiesResponse = await apiGetAllCities();
      if (citiesResponse.errors) {
        setError(citiesResponse.errors[0].message);
      } else {
        console.log("Loaded cities...");
        setCities(citiesResponse);
        setLoading(false);
        const firstElection = await apiGetElection(citiesResponse[0].id);
        setElection(firstElection);
        console.log("Loaded elections...");
        setLoadingElection(false);
        const candidateResponse = await apiGetAllCandidates();
        citiesResponse.errors
          ? setError(candidateResponse.errors[0].message)
          : setCandidates(candidateResponse);
        console.log("Loaded candidates...");
        setLoadingCandidates(false);
      }

      setError("");
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchElections() {
      const response = await apiGetElection(selectedCityId);
      response.errors
        ? setError(response.errors[0].message)
        : setElection(response);
    }
    if (selectedCityId) {
      fetchElections();
    }
  }, [selectedCityId]);

  function handleOnChange(event) {
    const newCitySelected = cities.find(
      (city) => city.name === event.target.value
    );
    console.log(newCitySelected);
    setSelectedCityId(newCitySelected.id);
  }
  let mainJsxElection = (
    <div className="flex flex-row justify-center mt-8">
      Carregando eleições...
      <Loading />
    </div>
  );

  let mainJsx = (
    <div className="flex flex-row justify-center mt-8">
      Carregando municípios...
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !loadingElection) {
    mainJsx = (
      <>
        <div className="text-center m-1 p-1">Escolha o município</div>
        <div className="flex flex-row items-center justify-center">
          <select name="citiesName" onChange={handleOnChange}>
            {cities.map((city) => {
              return <Item key={city.id}>{city}</Item>;
            })}
          </select>
        </div>
      </>
    );
  }

  if (!loadingElection && !loadingCandidates) {
    mainJsxElection = (
      <div>
        {election.map((election) => {
          let candidateObject = candidates.find(
            (candidate) => candidate.id === election.candidateId
          );
          let cityObject = cities.find((city) => city.id === election.cityId);
          return (
            <Election key={election.id}>
              Candidato: {candidateObject.name} -
              {((+election.votes * 100) / +cityObject.presence).toFixed(2)}% -{" "}
              {election.votes}
            </Election>
          );
        })}
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
