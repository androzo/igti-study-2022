export default function ElectionBoard({
  children,
  title = "Titulo da eleição",
}) {
  return (
    <div className="border m-2 p-4">
      <div className="text-center m-2 p-2">
        Eleição em{" "}
        <span>
          <strong>{title}</strong>
        </span>
      </div>
      <div className="flex flex-row justify-center flex-wrap">{children}</div>
    </div>
  );
}
