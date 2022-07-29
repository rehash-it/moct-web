import {
  faArchive,
  faArrowLeft,
  faArrowRight,
  faCommentAlt,
  faComments,
  faFile,
  faNewspaper,
  faPeopleCarry,
  faSignOutAlt,
  faSitemap,
  faUsers,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Logout } from "./Auth/Logout";
function SideNav({ setTabs, tabs, history, toggle, handleToggle }) {
  const navItems = [
    { icon: faNewspaper, text: "News" },
    { icon: faArchive, text: "Archives" },
    { icon: faPeopleCarry, text: "Vacancy" },
    { icon: faUserTimes, text: "Bids" },
    { icon: faSitemap, text: "Sites" },
    { icon: faFile, text: "Studies" },
    { icon: faUsers, text: "Users" },
    { icon: faComments, text: "Forum" },
    { icon: faCommentAlt, text: "Chats" },
  ];
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery("(max-width: 768px)");
  const handleDrawerSelect = (tabName) => {
    setTabs(tabName);
    handleToggle(false);
  }

  return mobile ? (
    <Drawer anchor="left" open={toggle} onClose={() => handleToggle(false)}>
      <List style={{ width: "250px", px: "5px" }}>
        {navItems.map((tab) => (
          <ListItem key={tab.text} button onClick={() => handleDrawerSelect(tab.text)}>
            <ListItemIcon>
              <FontAwesomeIcon
                color={tabs === tab.text ? "#0053af" : ""}
                icon={tab.icon}
                className="fa-2x mx-auto"
              />
            </ListItemIcon>
            <ListItemText>{tab.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  ) : (
    <div
      style={{
        display: "flex",
        minWidth: open ? 300 : 150,
        maxWidth: open ? 300 : 150,
        borderRight: "1px solid #e5e5e5",
        transition: 'all 0.3s'
      }}
    >
      <Box
        sx={{
          position: "sticky",
          px: 1,
          py: 4,
          alignSelf: "flex-start",
          flex: 1,
          top: 0,
          display: "flex",
        }}
      >
        <Box flexGrow={1}>
          <List>
            {navItems.map((tab) => (
              <ListItem key={tab.text} button onClick={() => setTabs(tab.text)}>
                <ListItemIcon>
                  <FontAwesomeIcon
                    color={tabs === tab.text ? "#0053af" : ""}
                    icon={tab.icon}
                    className="fa-2x mx-auto"
                  />
                </ListItemIcon>
                {open && <ListItemText>{tab.text}</ListItemText>}
              </ListItem>
            ))}
            <hr style={{ my: 5 }} />
            <ListItem
              button
              className="my-auto"
              onClick={() => Logout(history.push)}
            >
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="fa-2x mx-auto"
                ></FontAwesomeIcon>
              </ListItemIcon>
              {open && <ListItemText>Logout</ListItemText>}
            </ListItem>
          </List>
        </Box>
        <IconButton
          style={{ alignSelf: "flex-start" }}
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon
            className="fa-"
            icon={open ? faArrowLeft : faArrowRight}
          ></FontAwesomeIcon>
        </IconButton>
      </Box>
    </div>
  );
}

export default withRouter(SideNav);
