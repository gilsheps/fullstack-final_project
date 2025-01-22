import React, {useState} from "react"
import {Box, List, ListItem, ListItemText, Typography, Button, Card, CardContent, CardMedia, Link} from "@mui/material"
import dayjs from "dayjs"
import {handleDeleteMovie} from "./movieAction"
import UsersListComp from "../sharedComp/usersListComp"
import {handleMovieClick} from "../subscriptions/subscriptionAction"

export default function MovieItemComp({movies, findStr, setEditClick, setActiveTab, setCurrentMovie}) {
  const [value, setValue] = useState(false)
  return (
    <>
      <List>
        {movies
          .filter(item => (findStr ? item.movie.name.toLowerCase().includes(findStr) : item.movie))
          .map((item, index) => (
            <Box key={index} sx={{padding: 2}}>
              <Card variant="outlined" sx={{border: 1}}>
                <CardContent>
                  <ListItem
                    key={item.movie.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start"
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>
                          {item.movie.name}, {new Date(item.movie.premiered).getFullYear()}
                        </Typography>
                      }
                    />
                    <ListItemText primary={`Genres: ${item.movie.genres.map(genre => `"${genre}"`)}`} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          maxWidth: 120,
                          objectFit: "contain"
                        }}
                        image={item.movie.image}
                      />
                      <Card variant="outlined" sx={{border: 1, objectFit: "contain"}}>
                        <CardContent name="CardContentCardContent">
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
                                Subsciptions watched
                              </Typography>
                            }
                          />
                          <UsersListComp userList={item.members} handleClick={handleMovieClick} setValue={setValue} />

                          {/* {item.members.map((member, index) => {
                            return (
                              <List
                                key={index}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <ListItem>
                                  <ListItemText
                                    primary={<Link to="a">{member.name}</Link>}
                                    secondary={dayjs(member.date).format("DD/MM/YYYY")}
                                    sx={{display: "flex", gap: 2}}
                                  />
                                </ListItem>
                              </List>
                            )
                          })} */}
                        </CardContent>
                      </Card>
                    </Box>
                    <Box sx={{mt: 2}}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{mr: 1}}
                        onClick={() => {
                          setEditClick(true)
                          setCurrentMovie(item.movie)
                          setActiveTab(1)
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" size="small" onClick={() => handleDeleteMovie(item.movie)}>
                        Delete
                      </Button>
                    </Box>
                  </ListItem>
                </CardContent>
              </Card>
            </Box>
          ))}
      </List>
    </>
  )
}
