import { Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/context";
import { NavbarMenuLink } from "./navbarMenuLink";

export const NavbarLink = ({ link }) => {
  const [hasChildren, setHasChildren] = useState(false);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    if (link.children) {
      setHasChildren(true);
    }
  }, [link]);
  return !hasChildren ? (
    <Link
      key={link.route}
      to={link.route}
      className="link"
      style={{ margin: "0 5px" }}
    >
      <Typography variant="body1" style={{ textIndent: "unset" }}>
        {t(link.text)}
      </Typography>
    </Link>
  ) : (
    <NavbarMenuLink link={link} />
  );
};
