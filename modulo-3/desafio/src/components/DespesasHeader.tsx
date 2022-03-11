import { Box, Button } from "@material-ui/core";
import { MouseEvent } from "react";
import { IUser } from "../services/api";

interface IDespesasHeaderProps {
  user: IUser;
  onSignOut: () => void;
}

export default function DespesasHeader(props: IDespesasHeaderProps) {
  const { user, onSignOut } = props;
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        borderRadius={"16px"}
        boxShadow="md"
      >
        <Box textAlign="center" fontSize={30} fontFamily="Monospace" p={1}>
          Despesas
        </Box>
        <Box p={1}>
          Olá, {user.name}
          <Button variant="contained" color="primary" onClick={onSignOut}>
            Sair
          </Button>
        </Box>
      </Box>
    </div>
  );
}
