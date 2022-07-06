import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/context";
import styles from "../../styles/navbar.module.css";
import { NavbarMenuLink } from "./navbarMenuLink";

export const NavbarLink = ({ link }) => {
  const { t } = useContext(LanguageContext);

  return !link.children ? (
    <Link to={link.route} style={{ margin: "0 5px" }} className={styles.link}>
      <Typography variant="body1" style={{ textIndent: "unset" }}>
        {t(link.text)}
      </Typography>
    </Link>
  ) : (
    <NavbarMenuLink link={link} />
  );
};
