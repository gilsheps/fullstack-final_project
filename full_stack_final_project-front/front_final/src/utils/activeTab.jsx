import { useState } from "react";

const [activeTab, setActiveTab] = useState(0);


export default function ActiveTabComp() {
  const [activeTab, setActiveTab] = useState(0);

  const returnActiveTab = () => {
    setActiveTab(0);
    setEditClick(false);
  };

  const handleTabChange = (event, newValue) => {
    console.log("handleTabChange", event, newValue);
    setActiveTab(newValue);
    if (editClick) {
      setEditClick(false);
    }
  };

  return <div>activeTabComp</div>;
}
