import { getNewId } from '../services/idService';

export default function TextArea({
  labelDescription = 'Descrição do label:',
  textAreaValue = 'Valor padrão da text area',
  onTextAreaChange = null,
  id = getNewId(),
  autoFocus = false,
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        className="border p-2"
        maxLength={maxLength}
        autoFocus={autoFocus}
        value={textAreaValue}
        onChange={handleTextAreaChange}
        rows={rows}
      />

      <div className="flex flex-row justify-end mr-2">
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
