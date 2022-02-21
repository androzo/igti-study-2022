export default function TextInput({
  labelDescription = "Descrição do label",
  inputValue = "",
  onInputChange = null,
  id = "id_do_input_text",
  autofocus,
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
        autoFocus={autofocus}
        id={id}
        type="text"
        className="border p-1"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
