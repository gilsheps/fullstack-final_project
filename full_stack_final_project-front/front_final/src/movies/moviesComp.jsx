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
  Link,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api";
import AddOrEditMovieComp from "./addOrEditMovieComp";
import { useSelector, useDispatch } from "react-redux";
import TabManager from "../tabs/tabManager";
import dayjs from "dayjs";

export default function MoviesComp({
  activeTab,
  setActiveTab,
  editClick,
  setEditClick,
  returnActiveTab,
}) {
  const [movies, setMovies] = useState([]);
  const [res, setRes] = useState();
  const [currentMovie, setCurrentMovie] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [findStr, setFindStr] = useState("");
  const [updateMovies, setUpdateMovies] = useState("");
  const limit = 10;

  useEffect(() => {
    fetchData(page);
    console.log("res", res);
  }, [page]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`movies/${page}/${limit}`);
      console.log("response", response.data);
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
    window.location.reload();
  };
  const handleButtonClick = () => {
    setFindStr(updateMovies);
  };

  const foo = (bla) => {
    console.log("blalala", bla);
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
          <Box component="div" sx={{ maxWidth: 600 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <List>
                {movies
                  .filter((item) =>
                    findStr
                      ? item.movie.name.toLowerCase().includes(findStr)
                      : item.movie
                  )
                  .map((item, index) => (
                    <Box key={index} sx={{ padding: 2 }}>
                      <Card variant="outlined" sx={{ border: 1 }}>
                        <CardContent>
                          <ListItem
                            key={item.movie.id}
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
                                  {item.movie.name},{" "}
                                  {new Date(item.movie.premiered).getFullYear()}
                                </Typography>
                              }
                            />
                            <ListItemText
                              primary={`Genres: ${item.movie.genres.map(
                                (genre) => `"${genre}"`
                              )}`}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 5,
                              }}
                            >
                              <CardMedia
                                component="img"
                                sx={{
                                  maxWidth: 120,
                                  objectFit: "contain",
                                }}
                                image={item.movie.image}
                              />
                              <Card
                                variant="outlined"
                                sx={{ border: 1, objectFit: "contain" }}
                                name="carddddd"
                              >
                                <CardContent name="CardContentCardContent">
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        {"Subsciptions watched"}
                                      </Typography>
                                    }
                                  />

                                  {item.members.map((member, index) => {
                                    return (
                                      <List
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <ListItem>
                                          <ListItemText
                                            primary={
                                              <Link to="a">{member.name}</Link>
                                            }
                                            secondary={dayjs(
                                              member.date
                                            ).format("DD/MM/YYYY")}
                                            sx={{ display: "flex", gap: 2 }}
                                          />
                                        </ListItem>
                                      </List>
                                    );
                                  })}
                                </CardContent>
                              </Card>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{ mr: 1 }}
                                onClick={() => handleEditMovie(item.movie)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={(e) => handleDeleteMovie(item.movie)}
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
