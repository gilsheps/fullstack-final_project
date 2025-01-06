import React from "react";
import { useEffect, useState } from "react";
import apiSubscriptions from "../utils/apiSubscriptions";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  CardContent,
  Card,
} from "@mui/material";

export default function MoviesComp() {
  const [activeTab, setActiveTab] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiSubscriptions.get("movies");
      setMovies(data);
    };
    fetchData();
    console.log(movies);
  }, []);

  const handleTabChange = (event, newValue) => {
    console.log("handleTabChange", event, newValue);
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        Movies
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="All Movies" />
          <Tab label="Add Movie" />
        </Tabs>
        <Box
          sx={{ display: "flex", alignItems: "flex-start", marginLeft: "auto" }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginRight: 1 }}
          >
            Find Movie:
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter movie name"
            sx={{ marginRight: 1 }}
          />
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Find
          </Button>
        </Box>
      </Box>
      {activeTab === 0 && (
        <Box>
          {movies.map((movie, index) => {
            <Box key={index}>
              {/* <Box key={index} sx={{ mb: 2, textAlign: "left" }}> */}
              <Typography variant="h6">{movie.name} </Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                {movie.premiered}
              </Typography>

              {/* <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                  <Typography gutterBottom>
                    {movie.name} {movie.premiered}
                  </Typography>
                </CardContent>
              </Card> */}
            </Box>
          })}
        </Box>
      )}
    </Box>
  );
}
