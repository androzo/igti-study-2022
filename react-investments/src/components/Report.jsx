export default function Report({ children: report }) {
  const classProfit =
    report.profit === 0
      ? ""
      : report.profit >= 0
      ? "text-green-500"
      : "text-red-500";
  return (
    <div className="grid grid-cols-3 gap-3 text-sm ">
      <div className="text-center border-r-2">{report.date}</div>
      <div className="text-center  border-r-2">
        R$ {report.value.replace(".", ",")}
      </div>
      <div className={`text-right ${classProfit}`}>
        {report.profit.toFixed(2)}%
      </div>
    </div>
  );
}
