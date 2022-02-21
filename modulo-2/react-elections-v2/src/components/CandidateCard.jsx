export default function CandidateCard({
  children,
  candidateName = "Nome do candidato",
  imageName = "Referencia da imagem",
  percentVotes = "Porcentagem da votação",
  totalVotes = "Total de votos",
  electedFlag = false,
}) {
  const imgPath = "/img/" + imageName + ".png";
  const elected = electedFlag ? "Eleito" : "Não eleito";
  const electedClassName = electedFlag ? "text-green-500" : "text-red-400";
  const electedClassNameBg = electedFlag ? "bg-green-100" : "";
  return (
    <div
      className={`border p-2 m-2 flex flex-row items-center justify-center space-x-2 shadow-2xl flex-wrap rounded-3xl w-48 ${electedClassNameBg}`}
    >
      <img className="w-48 rounded-full" src={imgPath} alt={candidateName} />
      <ul className="">
        <li className="text-center m-2 p-2">
          <span className="font-semibold">{candidateName}</span>
        </li>
        <li className="text-center">
          <span className={electedClassName}>
            <strong>{percentVotes}</strong>
          </span>
        </li>
        <li className="text-center">
          <span className="text-xs">{totalVotes} votos</span>
        </li>
        <li className="text-center  m-2 p-2">
          <span className={`${electedClassName} font-semibold`}>{elected}</span>
        </li>
      </ul>
    </div>
  );
}
