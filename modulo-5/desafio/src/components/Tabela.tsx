import { IRodadaList } from "../types";

interface ITabelaProps {
  last_round: IRodadaList | undefined;
}

export default function Tabela(props: ITabelaProps) {
  const { last_round } = props;
  console.log(last_round?.partidas.length);
  return <div>{}</div>;
}
