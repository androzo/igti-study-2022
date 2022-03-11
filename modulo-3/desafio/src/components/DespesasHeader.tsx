import { Box, Button } from "@material-ui/core";
import { useContext } from "react";
import { authContext } from "../authContext";

export default function DespesasHeaders() {
  const { user, onSignOut } = useContext(authContext);
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
          <Box display="inline" m={1}>
            Olá, {user.nome}
          </Box>
          <Button variant="contained" color="primary" onClick={onSignOut}>
            Sair
          </Button>
        </Box>
      </Box>
    </div>
  );
}
