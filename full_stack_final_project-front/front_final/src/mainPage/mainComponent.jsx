import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as myModule from "../index";

export default function MainComponent() {
  const [value, setValue] = useState("1");
  const [activeTab, setActiveTab] = useState(0);
  const [editClick, setEditClick] = useState(false);

  useEffect(() => {
    console.log("main useEffect");
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
    console.log("handleChange", newValue);
    setValue(newValue);
    localStorage.setItem("newValue", newValue);
    console.log("getItem", localStorage.getItem("newValue"));
    setActiveTab(0);
    setEditClick(false);
  };

  const returnActiveTab = () => {
    setActiveTab(0);
    setEditClick(false);
  };
  return (
    <myModule.Box sx={{ width: "100%", typography: "body1" }}>
      <myModule.TabContext value={value}>
        <myModule.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <myModule.TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <myModule.Tab label="Movies" value="1" />
            <myModule.Tab label="Subscriptions" value="2" />
            <myModule.Tab label="Users Management" value="3" />
            <myModule.Tab label="Sign Out" value="4" />
          </myModule.TabList>
        </myModule.Box>
        <myModule.TabPanel value="1">
          {value === "1" && (
            <myModule.MoviesComp
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              editClick={editClick}
              setEditClick={setEditClick}
              returnActiveTab={returnActiveTab}
            />
          )}
        </myModule.TabPanel>
        <myModule.TabPanel value="2">
          {value === "2" && (
            <SubscriptionsComp
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              editClick={editClick}
              setEditClick={setEditClick}
              returnActiveTab={returnActiveTab}
            />
          )}
        </myModule.TabPanel>
        <myModule.TabPanel value="3">
          {value === "3" && (
            <ManagementComp
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              editClick={editClick}
              setEditClick={setEditClick}
              returnActiveTab={returnActiveTab}
            />
          )}
        </myModule.TabPanel>
        <myModule.TabPanel value="4">
          {value === "4" && <myModule.LogOutComp />}
        </myModule.TabPanel>
      </myModule.TabContext>
    </myModule.Box>
  );
}
