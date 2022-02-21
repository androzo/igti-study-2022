export default function Button({
  children: description = 'Descrição do botão',
  onButtonClick = null,
  colorClass = 'bg-gray-200',
  extraClasses = '',
  type = 'button',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      type={type}
      className={`p-2 m-1 rounded-md ${colorClass} ${extraClasses}`}
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
