import React from "react"
import { Box, Typography, Button, Select, MenuItem } from "@mui/material"
import DatePickerComp from "../components/datePickerComp"

export default function SubcscribeNewMovieComp({ member, movies, setSelectValue, selectValue, handleSubscribeClick, datePicker, setDatePicker }) {
  return (
    <>
      <Box sx={{ mt: 2, pb: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>Add a new movie</Typography>
      </Box>
      <Box>
        <Select
          labelId="select-movie-label"
          id={`select-movie-${member.id}`}
          onChange={e => setSelectValue(e.target.value)}
          displayEmpty={true}
          defaultValue=""
        >
          {movies
            .filter(movie => !member.movies.some(m => m.name === movie.name))
            .map((movie, index) => {
              return (
                <MenuItem value={movie} key={index}>
                  {movie.name}
                </MenuItem>
              )
            })}
        </Select>
        <DatePickerComp dateObj={new Date()} setDatePicker={setDatePicker} />
      </Box>
      <Box>
        <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={() => handleSubscribeClick(member, selectValue, datePicker)}>
          Subcribe
        </Button>
      </Box>
    </>
  )
}
