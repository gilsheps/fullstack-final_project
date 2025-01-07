import { useState, useEffect } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LogoutComp from "../logout/logout";
import MoviesComp from "../movies/moviesComp";
import SubscriptionsComp from "../subscriptions/subscriptionsComp";
import ManagementComp from "../users/managementComp";

export default function MainComponent() {
  const [value, setValue] = useState("3");

  useEffect(() => {
    let valueFromStorage = localStorage.getItem("newValue");
    if (valueFromStorage == "0") {
      setValue("1");
      localStorage.setItem("newValue", "1");
    } else {
      if (valueFromStorage < "4") {
        if (valueFromStorage) {
          if (valueFromStorage != value) {
            setValue(valueFromStorage);
          }
        } else {
          localStorage.setItem("newValue", value);
          setValue(localStorage.getItem("newValue"));
        }
      }
    }
  }, []);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
    localStorage.setItem("newValue", newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Movies" value="1" />
            <Tab label="Subscriptions" value="2" />
            <Tab label="Users Management" value="3" />
            <Tab label="Sign Out" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{value === "1" && <MoviesComp />}</TabPanel>
        <TabPanel value="2">{value === "2" && <SubscriptionsComp />}</TabPanel>
        <TabPanel value="3">{value === "3" && <ManagementComp />}</TabPanel>
        <TabPanel value="4">{value === "4" && <LogoutComp />}</TabPanel>
      </TabContext>
    </Box>
  );
}
