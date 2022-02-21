export default function SelectItem({ children, name, onCityChange }) {
  return (
    <div className="flex flex-row items-center justify-center">
      <select
        className="shadow-lg rounded-lg"
        name={name}
        onChange={onCityChange}
      >
        {children}
      </select>
    </div>
  );
}
