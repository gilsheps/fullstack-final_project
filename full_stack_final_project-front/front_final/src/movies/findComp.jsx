import React, { useState } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"

export default function FindComp({ setFindStr }) {
  const [updateMovies, setUpdateMovies] = useState("")
  const handleClick = e => {
    if (e.target.value && e.key == "Enter") {
      console.log('e.target.value && e.key == "Enter"')
      setFindStr(updateMovies)
    } else {
      console.log('removeItem')
      localStorage.removeItem('movieName')
      return ""
    }
  }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: 1 }}>
          Find Movie:
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          id="standard-find"
          placeholder="Enter movie name"
          onKeyDown={handleClick}
          onChange={e => (e.target.value ? setUpdateMovies(e.target.value.toLowerCase()) : setUpdateMovies(""))}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" sx={{ textTransform: "none" }} onClick={() => setFindStr(updateMovies)}>
          Find
        </Button>
      </Box>
    </>
  )
}
