import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Menu, MenuItem, Typography } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { LanguageContext } from "../../context/context";
import styles from "../../styles/navbar.module.css";


export const NavbarMenuLink = withRouter(({match, history, link }) =>  {
  const [anchor, setAnchor] = useState(null);
  
  const linkRef = useRef(null);
  const open = Boolean(anchor);
  
  const handleMenuClick = () => {
    setAnchor(linkRef.current);
  };
  
  const handleClose = () => {
    setAnchor(null);
  };

  const handleSelect = (child) => {
    history.push(getRoute(child))
    setAnchor(null);
  }
  
  const getRoute = (childLink) =>
  link.nested ? link.route + childLink.route : childLink.route;
  const selected = link.children.find(
    (child) => (link.nested ? getRoute(child) : child.route) === match.path
  );
  
  const { t } = useContext(LanguageContext);
  
  return (
    <Box
      component="a"
      ref={linkRef}
      style={{ margin: "0 5px" }}
      className={styles.link}
    >
      <Box display="flex" onClick={handleMenuClick} alignItems="center">
        <Typography
          variant={"body1"}
          style={{ textIndent: "unset" }}
          className="text-center"
        >
          {selected ? t(selected.text) : t(link.text)}
        </Typography>
        <FontAwesomeIcon
          className="fa-2x mb-1"
          icon={open ? faCaretUp : faCaretDown}
          style={{ marginLeft: 5 }}
        />
      </Box>
      <Menu anchorEl={anchor} open={open} onClick={handleClose} >
        {link.children.map((childLink) => (
          <MenuItem key={childLink.route} selected={childLink === selected} onClick={() => handleSelect(childLink)}>
            <Link to={getRoute(childLink)} className={styles.link}>
              <Typography variant="button">{t(childLink.text)}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

)
