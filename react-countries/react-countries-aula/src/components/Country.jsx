import React from "react";
import Item from "../components/Item";

export default function Country({
  children: country = null,
  onCountryClick = null,
  isVisited = false,
}) {
  if (!country) {
    return <div>Impossível renderizar o país</div>;
  }

  function handleCountryClick() {
    if (onCountryClick) {
      onCountryClick(country.id);
    }
  }

  const demographicDensity = country.population / country.area;
  const { flag, name, capital, region, population, area } = country;
  const isVisitedClassName = isVisited ? "bg-green-100" : "";

  return (
    <div
      className={`border p-2 m-2 flex flex-row items-center space-x-2 cursor-pointer ${isVisitedClassName}`}
      onClick={handleCountryClick}
    >
      <img className="w-48 " src={flag} alt={name} />

      <ul>
        <li>
          <Item label="Nome:">{name}</Item>
        </li>
        <li>
          <Item label="Capital:">{capital}</Item>
        </li>
        <li>
          <Item label="Região:">{region}</Item>
        </li>
        <li>
          <Item label="População:">{population}</Item>
        </li>
        <li>
          <Item label="Área:">{area}</Item>
        </li>
        <li>
          <Item label="Densidade demográfica:">
            {demographicDensity.toFixed(2)}
          </Item>
        </li>
      </ul>
    </div>
  );
}
