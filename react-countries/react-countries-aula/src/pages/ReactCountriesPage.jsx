import Header from "../components/Header";
import Main from "../components/Main";
import TextInput from "../components/TextInput";
import { allCountries } from "../data/countries";
import { getNewId } from "../services/idService";
import { useState } from "react";
import Countries from "../components/Countries";
import Country from "../components/Country";

export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState("Brazil");
  const [visitedCountries, setVisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  function toggleVisitedCountry(countryId) {
    let newVisitedCountries = [...visitedCountries];
    const isCountryVisited = newVisitedCountries.indexOf(countryId) !== -1;

    if (isCountryVisited) {
      newVisitedCountries = newVisitedCountries.filter((visitedCountryId) => {
        return visitedCountryId !== countryId;
      });
    } else {
      newVisitedCountries.push(countryId);
    }

    setVisitedCountries(newVisitedCountries);
  }

  const countryFilterLowercase = countryFilter.trim().toLocaleLowerCase();

  const filteredCountries =
    countryFilterLowercase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) =>
          nameLowerCase.includes(countryFilterLowercase)
        )
      : allCountries;

  return (
    <div>
      <Header>react-countries</Header>
      <Main>
        <TextInput
          id={getNewId()}
          labelDescription="Informe o nome do país (pelo menos 3 caracteres):"
          onInputChange={handleCountryFilterChange}
          inputValue={countryFilter}
          autoFocus
        />

        <h2 className="text-center font-semibold">
          {filteredCountries.length} país(es)
        </h2>
        <h3 className="text-center font-semibold">
          {visitedCountries.length} país(es) visitados
        </h3>
        <Countries>
          {filteredCountries.map((country) => {
            const isVisited = visitedCountries.indexOf(country.id) !== -1;

            return (
              <Country
                isVisited={isVisited}
                onCountryClick={toggleVisitedCountry}
                key={country.id}
              >
                {country}
              </Country>
            );
          })}
        </Countries>
      </Main>

      <div></div>
    </div>
  );
}
