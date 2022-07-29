import {
  faCaretDown,
  faCaretUp,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../context/context";
import { changeLanguage } from "../../translation/i18n";

export const LanguageSelect = ({ style }) => {
  const mobile = useMediaQuery("(max-width: 680px)");
  const [anchor, setAnchor] = useState(null);

  const buttonRef = useRef(null);
  const open = Boolean(anchor);
  const [lng, setLng] = useState(() => localStorage.getItem("lng"));
  useEffect(() => {
    localStorage.setItem("lng", lng);
  }, [lng]);

  const { t } = useContext(LanguageContext);

  const languageSelected = (lang) => {
    changeLanguage(lang);
    setLng(lang);
    setAnchor(null);
  };

  return (
    <div ref={buttonRef} style={style}>
      <Box
        display="flex"
        alignItems="center"
        onClick={() => setAnchor(buttonRef.current)}
        style={{
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon
          icon={faGlobe}
          style={{ height: "auto" }}
          className={`${mobile ? "fa-xs" : "fa-1x `"} mx-1`}
        />
        <Typography
          variant={mobile ? "body2" : "button"}
          style={{ textIndent: "unset " }}
        >
          {lng === "eng" ? t("English") : t("Amharic")}
        </Typography>
        <FontAwesomeIcon
          className="fa-1x mx-2 mb-1"
          icon={open ? faCaretUp : faCaretDown}
        />
      </Box>
      <Menu anchorEl={anchor} open={open} onClick={() => setAnchor(null)}>
        <MenuItem
          selected={lng === "eng"}
          onClick={() => languageSelected("eng")}
        >
          {t("English")}
        </MenuItem>
        <MenuItem
          selected={lng === "amh"}
          onClick={() => languageSelected("amh")}
        >
          {t("Amharic")}
        </MenuItem>
      </Menu>
    </div>
  );
};
