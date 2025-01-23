import { useState, useEffect } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MoviesComp, SubscriptionsComp, ManagementComp, LogOutComp } from "../index";
import { useSelector } from "react-redux";
import NoPermissionComp from "./noPermissionComp";
import { useNavigate } from "react-router";

export default function MainComponent() {
  const [value, setValue] = useState("1");
  const [activeTab, setActiveTab] = useState(0);
  const [editClick, setEditClick] = useState(false);
  const auth = useSelector((state) => state.auth);
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user") || session.isSessionExpired) {
      navigate("/login");
    } else {
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
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("newValue", newValue);
    setActiveTab(0);
    setEditClick(false);
  };

  const returnActiveTab = () => {
    setActiveTab(0);
    setEditClick(false);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Movies" value="1" />
            <Tab label="Subscriptions" value="2" />
            <Tab label="Users Management" value="3" />
            <Tab label="Sign Out" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {value === "1" && (
            <MoviesComp
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              editClick={editClick}
              setEditClick={setEditClick}
              returnActiveTab={returnActiveTab}
            />
          )}
        </TabPanel>
        <TabPanel value="2">
          {value === "2" && (
            <SubscriptionsComp
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setValue={setValue}
              editClick={editClick}
              setEditClick={setEditClick}
              returnActiveTab={returnActiveTab}
            />
          )}
        </TabPanel>
        <TabPanel value="3">
          {/*  */}
          {value === "3" &&
            (auth.permissions?.includes("Admin") ? (
              <ManagementComp
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                editClick={editClick}
                setEditClick={setEditClick}
                returnActiveTab={returnActiveTab}
              />
            ) : (
              <NoPermissionComp />
            ))}
        </TabPanel>
        <TabPanel value="4">{value === "4" && <LogOutComp />}</TabPanel>
      </TabContext>
    </Box>
  );
}
