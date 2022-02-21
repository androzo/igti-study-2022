export default function Header({ children, size }) {
  let fontSize = "text-xl";

  if (size === "large") {
    fontSize = "text-2xl";
  }

  return (
    <header>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className="bg-yellow-200 mx-auto p-4">
        <h1 className={`text-center font-semibold ${fontSize}`}>{children}</h1>
      </div>
    </header>
  );
}
