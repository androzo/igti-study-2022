export default function Investment({
  children,
  description = "Descrição do Investimento",
  totalIncome = "Total do rendimento",
  totalProfit = "Total de lucro",
}) {
  const classProfit = totalIncome >= 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="border m-2 p-4">
      <div className="p-2 text-center font-semibold">{description}</div>
      <div className="p-2 text-center font-semibold">
        Rendimento total:{" "}
        <span className={`${classProfit}`}>
          R$ {totalIncome.replace(".", ",")} ({totalProfit}%)
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
