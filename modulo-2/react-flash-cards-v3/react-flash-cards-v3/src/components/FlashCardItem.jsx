import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';

export default function FlashCardItem({
  children: flashCard = { title: 'Título', description: 'Descrição' },
  onEdit = null,
  onDelete = null,
}) {
  const { id, title, description } = flashCard;

  function handleEditClick() {
    if (onEdit) {
      onEdit(flashCard);
    }
  }

  function handleDeleteClick() {
    if (onDelete) {
      onDelete(id);
    }
  }

  return (
    <div className="border p-4 mb-4">
      <ul>
        <li>
          <strong>Título: </strong>
          <span>{title}</span>
        </li>

        <li>
          <strong>Descrição: </strong>
          <span>{description}</span>
        </li>
      </ul>

      <div className="flex flex-row items-center justify-end space-x-4 cursor-pointer mt-4">
        <EditIcon size={28} onClick={handleEditClick} />
        <DeleteIcon size={28} onClick={handleDeleteClick} />
      </div>
    </div>
  );
}
