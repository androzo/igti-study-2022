import { StyledButton } from "@/styles/styles";

interface ButtonProps {
  name: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const { onClick, name } = props;
  return (
    <>
      <StyledButton onClick={() => onClick()}>{name}</StyledButton>
    </>
  );
}
