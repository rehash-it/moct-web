import React from "react";
import { Box, Button } from "@material-ui/core";

function ForumMenu({ setTab, tab }) {
  const tabs = [
    {
      name: "past",
      text: "Closed Forums",
    },
    {
      name: "live",
      text: "Live Forum",
    },
    {
      name: "new",
      text: "Create Forum",
    },
  ];
  return (
    <Box style={{display: 'flex', justifyContent: 'space-evenly'}}>
      {tabs.map((tabItem) => (
        <Button
          color="primary"
          variant={tabItem.name === tab ? "contained" : "outlined"}
          onClick={(e) => setTab(tabItem.name)}
        >
          {tabItem.text}
        </Button>
      ))}
    </Box>
  );
}

export default ForumMenu;
