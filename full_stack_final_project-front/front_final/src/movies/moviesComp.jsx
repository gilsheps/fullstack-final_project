import {Box, Pagination} from "@mui/material";
import React from "react";
import {useState, useEffect} from "react";
import AddOrEditMovieComp from "./addOrEditMovieComp";
import TabManager from "../tabs/tabManager";
import api from "../utils/api";
import FindComp from "./findComp";
import MovieItemComp from "./movieItemComp.jsx";

export default function MoviesComp({activeTab, setActiveTab, editClick, setEditClick, returnActiveTab}) {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [findStr, setFindStr] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      await inithData(page, setMovies, setTotalPages);
    };
    if (localStorage.getItem("page")) {
      if (localStorage.getItem("page") != page) {
        setPage(parseInt(localStorage.getItem("page")));
      }
    }
    fetchData().catch(console.error);
  }, [page]);

  const inithData = async (page) => {
    try {
      const response = await api.get(`movies/${page}/${limit}`);
      const movieName = localStorage.getItem("movieName");
      const data = response.data.data;
      movieName
        ? (setMovies(data.filter((movie) => movie.movie.name == localStorage.getItem("movieName"))), setTotalPages(1))
        : (setMovies(data), setTotalPages(response.data.totalPages));
    } catch (error) {}
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    localStorage.setItem("page", value);
  };

  return (
    <Box>
      <TabManager
        tabs={[{label: "All Movies"}, {label: `${editClick ? "Edit" : "Add"} Movie`}]}
        title={"Movies"}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editClick={editClick}
        setEditClick={setEditClick}
      >
        {activeTab === 0 && <FindComp setFindStr={setFindStr} />}
      </TabManager>
      <Box>
        {activeTab === 0 && (
          <Box component="div">
            <MovieItemComp
              movies={movies}
              findStr={findStr}
              setEditClick={setEditClick}
              setActiveTab={setActiveTab}
              setCurrentMovie={setCurrentMovie}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{marginTop: 2}} />
            </Box>
          </Box>
        )}
        {activeTab === 1 &&
          (editClick ? (
            <AddOrEditMovieComp movie={currentMovie} returnActiveTab={returnActiveTab} />
          ) : (
            <AddOrEditMovieComp returnActiveTab={returnActiveTab} />
          ))}
      </Box>
    </Box>
  );
}
