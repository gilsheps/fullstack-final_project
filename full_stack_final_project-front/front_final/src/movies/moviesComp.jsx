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
import { useSelector, useDispatch } from "react-redux";
import TabManager from "../tabs/tabManager";

export default function MoviesComp({
  activeTab,
  setActiveTab,
  editClick,
  setEditClick,
  returnActiveTab,
}) {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [findStr, setFindStr] = useState("");
  const [updateMovies, setUpdateMovies] = useState("");
  const limit = 10;

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`movies/${page}/${limit}`);
      setMovies(response.data.data); // Set fetched data
      setTotalPages(response.data.totalPages); // Set total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchData(value);
  };

  const handleEditMovie = (movie) => {
    setEditClick(true);
    setCurrentMovie(movie);
    setActiveTab(1);
  };

  const handleDeleteMovie = async (movie) => {
    console.log("handleDeleteMovie", movie);
    const { data } = await api.delete(`/movies/${movie._id}`);
    console.log("data", data);
    window.location.reload();
  };
  const handleButtonClick = () => {
    setFindStr(updateMovies);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TabManager
        tabs={[
          { label: "All Movies" },
          { label: `${editClick ? "Edit" : "Add"} Movie` },
        ]}
        title={"Movies"}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editClick={editClick}
        setEditClick={setEditClick}
      >
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
            id="standard-find"
            placeholder="Enter movie name"
            onKeyDown={(e) => (e.key == "Enter" ? handleButtonClick() : "")}
            onChange={(e) =>
              e.target.value
                ? setUpdateMovies(e.target.value.toLowerCase())
                : setUpdateMovies("")
            }
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleButtonClick}
          >
            Find
          </Button>
        </Box>
      </TabManager>
      <Box>
        {activeTab === 0 && (
          <Box sx={{ maxWidth: 500 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <List>
                {movies
                  .filter((movie) =>
                    findStr ? movie.name.toLowerCase().includes(findStr) : movie
                  )
                  .map((movie, index) => (
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
                                onClick={(e) => handleDeleteMovie(movie)}
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
    </Box>
  );
}
