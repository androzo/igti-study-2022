import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { getDataFromApi, IExchange } from "../services/api";
import { StyledHeader } from "./styles";

export default function Home() {
  const [data, setData] = useState<IExchange[]>([]);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    getDataFromApi(pageIndex).then(setData);
  }, [pageIndex]);

  return (
    <div>
      <StyledHeader>Desafio Modulo 4</StyledHeader>
      <Button
        name="Anterior"
        onClick={() => {
          pageIndex !== 1 ? setPageIndex(pageIndex - 1) : {};
        }}
      />
      <Button
        name="Próximo"
        onClick={() => {
          data.length === 100 ? setPageIndex(pageIndex + 1) : {};
        }}
      />
      <ul>
        {data?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
