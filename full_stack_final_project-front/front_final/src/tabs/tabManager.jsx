import { Box, Tabs, Tab, Typography } from "@mui/material"

const TabManager = ({ tabs, title, activeTab, setActiveTab, children, editClick, setEditClick }) => {
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    if (editClick) {
      setEditClick(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        {children}
      </Box>
    </Box>
  )
}

export default TabManager
