export default function FlashCards({
  id,
  title = "Titulo do card",
  description = "Descrição do card",
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) {
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }
  const fontSizeClassName = showFlashCardTitle ? "text-xl" : "text-sm";
  return (
    <div
      className={`shadow-lg m-2
                  p-4 w-80 h-48 cursor-pointer
                  flex flex-row items-center 
                  justify-center font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
