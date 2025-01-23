import React from "react";
import { Box,TextField,Typography,Button } from "@mui/material";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import api from "../utils/api";

export default function AddOrEditMovieComp({ movie, returnActiveTab }) {
  const [updateMovie, setUpdateMovie] = useState({ ...movie });
  const [value, setValue] = useState(dayjs(movie?.premiered));

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "standard-genres") {
      updateMovie[e.target.id.split("-")[1]] = [...e.target.value.split(",")];
    } else {
      updateMovie[e.target.id.split("-")[1]] = e.target.value;
    }
    console.log("handleChange", updateMovie);
  };
  const handleSubmit = async (e) => {
    delete updateMovie._id;
    if (!updateMovie["premiered"]) {
      console.log("sdflsndfkjlnsdfjksdn");
      handlPickerChange(new Date());
    }
    console.log("handleSubmit", updateMovie);
    try {
      const { data } = movie
        ? await api.put(`/movies/${movie._id}`, { updateMovie })
        : await api.post("/movies/", { updateMovie });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
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
