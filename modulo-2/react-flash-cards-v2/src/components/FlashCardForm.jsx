import TextArea from "./TextArea";
import TextInput from "./TextInput";

export default function FlashCardForm({ createMode = true }) {
  const backGroundClassName = createMode ? "bg-green-100" : "bg-blue-100";
  return (
    <form className={`p-4 ${backGroundClassName}`}>
      <h2 className="text-center font-semibold">Manutenção de FlashCards</h2>
      <TextInput labelDescription="Título: "> </TextInput>
      <TextArea labelDescription="Título: "> </TextArea>
    </form>
  );
}
