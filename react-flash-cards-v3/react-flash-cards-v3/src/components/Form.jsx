import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function Form({
  title: formTitle = 'Título do formulário',
  isCreate = true,
  children: flashCard = null,
  onFormSubmit = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isCreate) {
      setTitle('');
      setDescription('');
    }
  }, [isCreate]);

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function handleFormReset() {
    setTitle('');
    setDescription('');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError('');

      if (onFormSubmit) {
        onFormSubmit({ title, description });
        handleFormReset();
      }
    } else {
      setError('Todos os campos devem ser preenchidos!');
    }
  }

  const formBackground = isCreate ? 'bg-green-50' : 'bg-yellow-50';

  return (
    <form
      className={`p-4 ${formBackground}`}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <h2 className="font-semibold flex flex-row justify-center text-xl">
        {formTitle}
      </h2>

      <TextInput
        labelDescription="Título do flash card:"
        inputValue={title}
        onInputChange={handleTitleChange}
        autoFocus
      />

      <TextArea
        labelDescription="Descrição do flash card:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />

      <div className="flex flex-row items-center justify-between">
        <Error>{error}</Error>

        <div>
          <Button colorClass="bg-red-200" type="reset">
            Limpar
          </Button>

          <Button colorClass="bg-green-200" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
