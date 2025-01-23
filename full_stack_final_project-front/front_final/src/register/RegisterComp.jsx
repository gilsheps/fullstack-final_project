import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, SignInContainer } from "../shared-theme/CardAndContainer";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import api from "../utils/api.js";

export default function RegisterComp() {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [nameError, setNameError] = useState(false);

  const handleSubmit = () => {
    console.log(user.email, user.password);
    api.post("/auth/register", {
      username: username,
      password: password,
    });
  };

  const handleCancelClicked = () => {
    navigate("/");
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Create an Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
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
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={handleCancelClicked} variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>
    </SignInContainer>
  );
}
