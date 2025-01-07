import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api";
import AddOrEditMovieComp from "./addOrEditMovieComp";

export default function MoviesComp() {
  const [activeTab, setActiveTab] = useState(0);
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [editClick, setEditClick] = useState(false);
  const limit = 10;

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if (editClick) {
      setEditClick(false);
    }
  }, []);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`movies/${page}/${limit}`);
      console.log("response.data", response);
      setMovies(response.data.docs); // Set fetched data
      setTotalPages(response.data.totalPages); // Set total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const returnActiveTab = () => {
    setActiveTab(0);
    setEditClick(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchData(value);
  };

  const handleTabChange = (event, newValue) => {
    console.log("handleTabChange", event, newValue);
    setActiveTab(newValue);
    if (editClick) {
      setEditClick(false);
    }
  };

  const handleEditMovie = (movie) => {
    console.log("handleEditMovie");
    setEditClick(true);
    setCurrentMovie(movie);
    setActiveTab(1);
  };
  const handleDeleteMovie = (e, movie) => {
    console.log("handleDeleteMovie", e.target);
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
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
        <Box sx={{ maxWidth: 500 }}>
          {/* sx={{ maxWidth: 600, margin: "auto", padding: 2 }} */}
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {movies.map((movie, index) => (
                <Box key={index} sx={{ padding: 2 }}>
                  <Card variant="outlined" sx={{ border: 1 }}>
                    <CardContent>
                      <ListItem
                        key={movie.id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              {movie.name},{" "}
                              {new Date(movie.premiered).getFullYear()}
                            </Typography>
                          }
                        />
                        <ListItemText
                          primary={`genres: ${movie.genres.map(
                            (genre) => `"${genre}"`
                          )}`}
                        />
                        <Box sx={{ flexDirection: "column" }}>
                          <CardMedia
                            component="img"
                            sx={{
                              maxWidth: 100,
                              pt: 1,
                              objectFit: "contain",
                            }}
                            image={movie.image}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleEditMovie(movie)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => handleDeleteMovie(e, movie)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </ListItem>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </List>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{ marginTop: 2 }}
            />
          </Box>
        </Box>
      )}
      {activeTab === 1 &&
        (editClick ? (
          <AddOrEditMovieComp
            movie={currentMovie}
            returnActiveTab={returnActiveTab}
          />
        ) : (
          <AddOrEditMovieComp returnActiveTab={returnActiveTab} />
        ))}
    </Box>
  );
}
