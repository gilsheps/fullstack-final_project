import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Card,
  CardContent,
  ListItemIcon,
  Link,
} from "@mui/material";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api";
import TabManager from "../tabs/tabManager";
import AddOrEditMemberComp from "./addOrEditMemberComp";
import dayjs from "dayjs";

export default function SubscriptionsComp({
  activeTab,
  setActiveTab,
  setValue,
  editClick,
  setEditClick,
  returnActiveTab,
}) {
  const [currentMember, setCurrentMember] = useState({});
  const [members, setMembers] = useState([]);
  useEffect(() => {
    console.log("SubscriptionsComp", activeTab.tab);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("members");
      setMembers(data);
    };
    fetchData().catch(console.error);
  }, []);

  const handleEditMember = (member) => {
    console.log("handleEditMember");
    setEditClick(true);
    setCurrentMember(member);
    setActiveTab(1);
  };

  const handleDeleteMember = () => {
    console.log("handleDeleteMember");
  };

  const onMovieClick = () => {
    localStorage.setItem("newValue", "1");
    setValue("1")
    
  };
  return (
    <Box sx={{ p: 3 }}>
      <TabManager
        tabs={[{ label: "All Movies" }, { label: "Add Member" }]}
        title={"Subscriptions"}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 && (
        <Box sx={{ maxWidth: 500 }}>
          <List>
            {members.map((member, index) => (
              <Box key={index} sx={{ pt: 2 }}>
                <Card variant="outlined" sx={{ border: 1 }}>
                  <CardContent>
                    <ListItem
                      key={member.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {member.name}
                          </Typography>
                        }
                      />

                      <Box sx={{ paddingTop: 2 }}>
                        <ListItemText primary={`Email: ${member.email}`} />
                        <ListItemText primary={`City: ${member.city}`} />
                      </Box>
                      <Box sx={{ mt: 2 }} name="box_btn">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEditMember(member)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => handleDeleteMember(member)}
                        >
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
                        justifyContent: "flex-start",
                      }}
                      name="box_movies"
                    >
                      <Card variant="outlined" sx={{ border: 1 }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                            name="box_card"
                          >
                            <ListItemText
                              primary={
                                <Typography sx={{ fontWeight: "bold" }}>
                                  {"Movies watched"}
                                </Typography>
                              }
                            />
                            <Button
                              variant="contained"
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              Subcscribe to new movie
                            </Button>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                              name="box_list"
                            >
                              {member.movies.map((movie, index) => {
                                return (
                                  <List key={index}>
                                    <ListItem>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                        name="box_listitem"
                                      >
                                        <ListItemIcon>
                                          <CircleRoundedIcon
                                            sx={{
                                              color: "black",
                                              fontSize: 15,
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={
                                            <Button
                                            onClick={onMovieClick}
                                              component={Link}
                                              href="#"
                                            >
                                              {movie.name}
                                            </Button>
                                          }
                                          secondary={dayjs(movie.date).format(
                                            "DD/MM/YYYY"
                                          )}
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: 300,
                                          }}
                                        />
                                      </Box>
                                    </ListItem>
                                  </List>
                                );
                              })}
                            </Box>
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
          <AddOrEditMemberComp
            member={currentMember}
            returnActiveTab={returnActiveTab}
          />
        ) : (
          <AddOrEditMemberComp returnActiveTab={returnActiveTab} />
        ))}
    </Box>
  );
}
