import Button from "@mui/material/Button";

export default function MyButton({
  children: description = "Descrição do botão",
  onClick = null,
}) {
  function handleButtonClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <Button variant="contained" onClick={handleButtonClick}>
      {description}
    </Button>
  );
}
