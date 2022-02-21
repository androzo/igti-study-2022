import { getAllData, postData, updateData, deleteData } from './httpService';

export async function apiGetAllFlashCards() {
  const allFlashCards = await getAllData('/flashcards');
  return [...allFlashCards];
}

export async function apiCreateFlashCard(data) {
  const newFlashCard = await postData('/flashcards', data);
  return newFlashCard;
}

export async function apiUpdateFlashCard({ id, title, description }) {
  const updatedFlashCard = await updateData(`/flashcards/${id}`, {
    title,
    description,
  });

  return updatedFlashCard;
}

export async function apiDeleteFlashCard(id) {
  await deleteData(`/flashcards/${id}`);
}
