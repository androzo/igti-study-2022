import { getNewId } from '../services/idService';

export default function TextInput({
  labelDescription = 'Descrição do label:',
  inputValue = 'Valor padrão do input',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <input
        id={id}
        className="border p-1"
        type="text"
        autoFocus={autoFocus}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
