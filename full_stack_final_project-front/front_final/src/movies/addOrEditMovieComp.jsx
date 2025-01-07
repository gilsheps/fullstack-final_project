import React from "react";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddOrEditMovieComp({ movie, returnActiveTab }) {
  const [updateMovie, setUpdateMovie] = useState({ ...movie });
  const [value, setValue] = useState(dayjs(movie?.premiered));
  useEffect(() => {
    console.log("useEffect", movie);
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    console.log("handleChange", e.target.value);
    updateMovie[e.target.id.split("-")[1]] = e.target.value;
  };
  const handleSubmit = async (e) => {
    e.preventDefault;
    console.log("handleSubmit", e.target);
    const { data } = movie
      ? await api.put(`/movies/${movie.id}`, { updateMovie })
      : await api.post("/movies/", { updateMovie });
    console.log(data);
  };
  const handlPickerChange = (newValue) => {
    setValue(newValue);
    updateMovie["premiered"] = dayjs(newValue).toISOString();
    console.log("handlPickerChange", updateMovie);
  };
  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h6" gutterBottom>
          {movie?.name ? `Edit Movie: ${movie?.name}` : "Add New Movie"}
        </Typography>
        <Box
          sx={{
            pt: 3,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            width: "40ch",
            gap: 2,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-name"
            label="Name:"
            name="standard-name"
            defaultValue={movie?.name || ""}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            id="standard-genres"
            label="Genres:"
            name="standard-genres"
            defaultValue={movie?.genres || ""}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="standard-img"
            label="Image URl:"
            name="standard-genres"
            defaultValue={movie?.image || ""}
            onChange={(e) => handleChange(e)}
          />
          {/* <TextField
            id="standard-premiered"
            label="Premiered:"
            name="standard-premiered"
            defaultValue={dayjs(movie?.premiered).format("DD-MM-YYYY") || ""}
            onChange={(e) => handleChange(e)}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Created date:"
              defaultValue={value}
              onChange={(e, newValue) => handlPickerChange(e, newValue)}
              slotProps={{
                textField: {
                  id: "standard-createDate",
                },
              }}
            />
          </LocalizationProvider>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" sx={{ mr: 1 }} type="submit">
              {movie ? "Update" : "Save"}
            </Button>
            <Button variant="contained" onClick={returnActiveTab}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
