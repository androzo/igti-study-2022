import Button from "@mui/material/Button";

export default function MyButton({
  children: description = "Descrição do botão",
  onbuttonClick = null,
}) {
  function handleButtonClick() {
    if (onbuttonClick) {
      onbuttonClick();
    }
  }
  return (
    <Button variant="contained" onClick={handleButtonClick}>
      {description}
    </Button>
  );
}
