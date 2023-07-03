import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Card, CardActions, CardContent, Stack } from "@mui/material";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { loginSelector, loginStatus } from "../store/slices/loginSlice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const loginReducer = useSelector(loginSelector);

  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>(
    "Please Login First !"
  );
  const [user, setUser] = useState<string | null>(null);

  React.useEffect(() => {
    console.log("Success:", success);
    console.log("message:", errorMessage);
    console.log("user", user);
    setErrorMessage(errorMessage);
    if (success) {
      dispatch(loginStatus({ success, user }));
      navigate('/stock')
      console.log(loginReducer.success);
    }
  }, [success, errorMessage, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL

    const data = new FormData(event.currentTarget);
    const loginInput = {
      username: data.get("email") as string | null,
      password: data.get("password") as string | null,
    };

    try {
      const result = await axios.post(
        `${apiBackendUrl}/api/v2/authen/login`,
        loginInput
      );
      console.log(result.data)
      
      setSuccess((logged) => (result.data.result === "ok" ? true : false));
      setUser(loginInput.username);
      setErrorMessage(result.data.message);
    
    } catch (error) {
      setSuccess(false);
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <Stack direction={'row'} maxWidth={'100%'} justifyContent={'center'} alignItems={'center'} >
      
      <Card sx={{ maxWidth: 500, height: 600, padding: "30px" }}>
        <CardContent>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {!success && <Alert severity="error">{errorMessage}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    onClick={() => navigate("/register")}
                    sx={{ fontSize: "0.70rem" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </CardActions>
      </Card>
    </Stack>
  );
}
