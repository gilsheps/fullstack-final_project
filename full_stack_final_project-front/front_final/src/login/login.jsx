import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const BASE_SERVER_URL = "http://localhost:3005/api";
const BASE_AUTH = `${BASE_SERVER_URL}/auth/`;
import {
  Box,
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Card, SignInContainer } from "../shared-theme/CardAndContainer";

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_AUTH}login`, {
      username: username || e.target.username.defaultValue,
      password: password || e.target.password.defaultValue,
    });

    if (res.status === 200) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: username || e.target.username.defaultValue,
          token: res.data.token,
        })
      );
      navigate("/main_page", { replace: true });
    }
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <div>
        <h3 style={{ color: "black" }}>Movies - Subscription Web Site</h3>
      </div>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Log in Page
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <TextField
              id="username"
              type="text"
              label="User name"
              placeholder="Your user name"
              error={nameError}
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "email" }}
              defaultValue="admin"
              onChange={() => setUserName(e.target.value)}
              helperText={nameError ? "Please enter your email" : ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              defaultValue="1234"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            New User?{" "}
            <span>
              <Link
                href="/register"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Create Account
              </Link>
            </span>
          </Typography>
        </Box>
      </Card> 
    </SignInContainer>
  );
}
