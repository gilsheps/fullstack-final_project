import {Box, List, ListItem, ListItemText, Typography, Button, Card, CardContent} from "@mui/material"
import React from "react"
import {useState, useEffect} from "react"
import api from "../utils/api"
import TabManager from "../tabs/tabManager"
import AddOrEditMemberComp from "./addOrEditMemberComp"
import SubcscribeNewMovieComp from "./subcscribeNewMovieComp"
import {handleEditMember, handleDeleteMember, handleMovieClick, toggleSelectVisibility, handleSubscribeClick} from "./subscriptionAction"
import UsersListComp from "../sharedComp/usersListComp"

export default function SubscriptionsComp({activeTab, setActiveTab, setValue, editClick, setEditClick, returnActiveTab}) {
  const [currentMember, setCurrentMember] = useState({})
  const [members, setMembers] = useState([])
  const [visibleSelect, setVisibleSelect] = useState({}) // Visibility state for each member
  const [selectValue, setSelectValue] = useState({}) // Visibility state for each member
  const [movies, setMovies] = useState()
  const [datePicker, setDatePicker] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await api.get("members")
      setMembers(data)
      const {data: movies} = await api.get("movies")
      setMovies(movies)
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <Box sx={{p: 3}}>
      <TabManager tabs={[{label: "All Movies"}, {label: "Add Member"}]} title={"Subscriptions"} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 && (
        <Box sx={{maxWidth: 500}}>
          <List>
            {members.map((member, index) => (
              <Box key={index} sx={{pt: 2}}>
                <Card variant="outlined" sx={{border: 1}}>
                  <CardContent>
                    <ListItem
                      key={member.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{fontWeight: "bold"}}>
                            {member.name}
                          </Typography>
                        }
                      />

                      <Box sx={{paddingTop: 2}}>
                        <ListItemText primary={`Email: ${member.email}`} />
                        <ListItemText primary={`City: ${member.city}`} />
                      </Box>
                      <Box sx={{mt: 2}} name="box_btn">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{mr: 1}}
                          onClick={() => handleEditMember(member, setEditClick, setCurrentMember, setActiveTab)}
                        >
                          Edit
                        </Button>
                        <Button variant="contained" size="small" onClick={e => handleDeleteMember(member)}>
                          Delete
                        </Button>
                      </Box>
                    </ListItem>
                    <Box
                      key={index}
                      sx={{
                        pt: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                      }}
                      name="box_movies"
                    >
                      <Card variant="outlined" sx={{border: 1}}>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start"
                            }}
                            name="box_card"
                          >
                            <ListItemText primary={<Typography sx={{fontWeight: "bold"}}>{"Movies watched"}</Typography>} />
                            <Button variant="contained" size="small" sx={{mr: 1}} onClick={() => toggleSelectVisibility(member.id, setVisibleSelect)}>
                              Subcscribe to new movie
                            </Button>
                            {visibleSelect[member.id] && (
                              <SubcscribeNewMovieComp
                                member={member}
                                movies={movies}
                                setSelectValue={setSelectValue}
                                selectValue={selectValue}
                                handleSubscribeClick={handleSubscribeClick}
                                datePicker={datePicker}
                                setDatePicker={setDatePicker}
                              />
                            )}

                            <UsersListComp userList={member.movies} handleClick={handleMovieClick} setValue={setValue} />
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </List>
        </Box>
      )}
      {activeTab === 1 &&
        (editClick ? (
          <AddOrEditMemberComp member={currentMember} returnActiveTab={returnActiveTab} />
        ) : (
          <AddOrEditMemberComp returnActiveTab={returnActiveTab} />
        ))}
    </Box>
  )
}
