import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, FormControl, Link, TextField, Typography } from "@mui/material";
import { Card, SignInContainer } from "../shared-theme/CardAndContainer";
import { loginSuccess } from "../redux/authSlice";
import { setSessionTimeout, } from "../redux/sessionSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/api.js";

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameError) {
      setNameError(true);
    } else {
      try {
        const { data } = await api.post("auth/login", {
          username: username || e.target.username.value,
          password: password || e.target.password.value,
        });

        // const data = res.data;
        dispatch(loginSuccess({ user: data.user, token: data.token, permissions: data.permissions }));
        dispatch(setSessionTimeout({ sessionTimeOut: data.user.sessionTimeOut, loginTimestamp: Date.now() }))
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/main_page", { replace: true });
      } catch (error) {
        console.log("error", error);
      }
      console.log("nameError in the end", nameError);
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value || e.target.username.defaultValue);
    setNameError(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value || e.target.password.defaultValue);
    setNameError(false);
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <div>
        <h3 style={{ color: "black" }}>Movies - Subscription Web Site</h3>
      </div>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
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
              sx={{ ariaLabel: "username" }}
              defaultValue="admin"
              onChange={handleNameChange}
              helperText={nameError ? "Check your username" : ""}
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
              onChange={handlePasswordChange}
              helperText={nameError ? "Check your password" : ""}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            New User?{" "}
            <span>
              <Link href="/register" variant="body2" sx={{ alignSelf: "center" }}>
                Create Account
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}
