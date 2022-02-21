import { useEffect, useState } from "react";

export default function FlashCards({
  title = "Titulo do card",
  description = "Descrição do card",
  showFlashCardTitle = true,
}) {
  const [showTitle, setShowTitle] = useState(showFlashCardTitle);

  useEffect(() => {
    setShowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]);

  function handleCardClick() {
    setShowTitle((currentShowTitle) => !currentShowTitle);
  }
  const fontSizeClassName = showTitle ? "text-xl" : "text-sm";
  return (
    <div
      className={`shadow-lg m-2
                  p-4 w-80 h-48 cursor-pointer
                  flex flex-row items-center 
                  justify-center font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleCardClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
