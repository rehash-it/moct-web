import {
  faBars,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { LanguageContext } from "../../context/context";

export const AppDrawer = withRouter(({match, history, links }) => {
  const mobile = useMediaQuery("(max-width: 680px)");

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState({});

  const openDropdown = (id) => {
    setDropDownOpen({ ...dropdownOpen, [id]: !dropdownOpen[id] });
  };

  const toggleDrawer = (value) => {
    setOpen(value);
  };

  const getRoute = (link, parent) => parent.nested? parent.route + link.route : link.route
  const handleSelect = (link, parent) => {
    history.push(getRoute(link, parent))
  }

  const { t } = useContext(LanguageContext);
  return (
    <>
      <IconButton
        onClick={() => toggleDrawer(true)}
        size={mobile ? "small" : "medium"}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`${open ? "fa-rotate-90" : ""}`}
          style={{ transition: "all 0.2s ease-in-out" }}
        />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <List sx={{ maxWidth: 360, width: 250, padding: "0 5px" }}>
          {links.map((link) =>
            !link.children ? (
              <ListItem button key={link.text}>
                <Typography component="span">{t(link.text)}</Typography>
              </ListItem>
            ) : (
              <React.Fragment key={link.text}>
                <ListItem button onClick={() => openDropdown(link.text)} >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Typography component="span">{t(link.text)}</Typography>
                    <FontAwesomeIcon
                      icon={!dropdownOpen[link.text] ? faCaretDown : faCaretUp}
                      className="fa-1x mx-1 mb-1"
                    />
                  </Box>
                </ListItem>
                <Collapse
                  in={dropdownOpen[link.text]}
                  timeout="auto"
                  mountOnEnter
                  style={{ marginLeft: "10px" }}
                  key={link.text}
                >
                  <List>
                    {link.children.map((child) => (
                      <ListItem button onClick={() => handleSelect(child, link)} key={child.text}>
                        <Typography component="span">
                          {t(child.text)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            )
          )}
        </List>
      </Drawer>
    </>
  );
});
