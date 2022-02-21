import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = "Descrição do label:",
  textAreaValue = "Valor padrão do text area",
  onTextAreaChange = null,
  id = getNewId(),
  autoFocus = false,
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (handleTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        autoFocus={autoFocus}
        id={id}
        className="border p-1"
        maxLength={maxLength}
        rows={rows}
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
    </div>
  );
}
