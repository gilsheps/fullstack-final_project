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
import TabManager from "../tabs/tabManager";
import AddOrEditMemberComp from "./addOrEditMemberComp";

export default function SubscriptionsComp({
  activeTab,
  setActiveTab,
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
              <Box key={index} sx={{ padding: 2 }}>
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
                      <Box sx={{ mt: 2 }}>
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
