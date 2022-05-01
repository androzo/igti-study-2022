import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { signInEndpoint, IUser } from "../services/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    loginBox: {
      display: "block",
      textAlign: "center",
      margin: 2,
      fontSize: 30,
      fontFamily: "Monospace",
    },
    error: {
      backgroundColor: "rgb(253, 236 ,234)",
      borderRadius: "4px",
      padding: "16px",
      margin: "16px 0",
    },
  })
);

interface ILoginPageProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginPage(props: ILoginPageProps) {
  const classes = useStyles();
  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, (e) =>
      setError("Email não encontrado ou senha incorreta")
    );
  }

  return (
    <>
      <Box m={4} p={4}>
        <Container maxWidth="xs">
          <Box m={2} p={2} boxShadow={4}>
            <Box className={classes.loginBox}>Despesas</Box>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={signIn}
            >
              <Box component="span" display="block">
                <TextField
                  id="user"
                  label="Login"
                  fullWidth={true}
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </Box>
              <Box component="span" display="block">
                <TextField
                  value={password}
                  type="password"
                  id="password"
                  label="Password"
                  fullWidth={true}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </Box>
              {error && <div className={classes.error}>{error}</div>}
              <Box display="flex" justifyContent="right" p={1}>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Box>
            </form>
          </Box>
          {/* usuario@email.com e senha 1234 */}
        </Container>
      </Box>
    </>
  );
}
