import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import {
  faFacebook,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Box, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/context";
import { Logo } from "../navbar/logo";
function Footer() {
  const { t } = useContext(LanguageContext);
  const quickLinks = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/about",
      text: "About",
    },
    {
      to: "/news",
      text: "News",
    },
    {
      to: "/sites?region=All",
      text: "Attraction sites",
    },
    {
      to: "/vacancy",
      text: "Vacancy",
    },
    {
      to: "/bids",
      text: "Bids",
    },
    {
      to: "/forums",
      text: "Forums",
    },
    {
      to: "/docs",
      text: "Research",
    },
  ];
  return (
    <footer
      style={{ marginTop: "auto", width: "100%", backgroundColor: "#e5e5e5" }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            px: 4,
            mt: 4,
          }}
        >
          <Box>
            <Logo />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h6" paragraph>
              {t("Quick Links")}
            </Typography>
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="link">
                <h6>{t(link.text)}</h6>
              </Link>
            ))}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h6" paragraph>
              {t("Contact Us")}
            </Typography>
            <Box display="flex" alignItems="center">
              <FontAwesomeIcon
                fill="#fff"
                icon={faMapMarkerAlt}
                style={{ paddingRight: 5, fill: "#fff" }}
                className="fa-2x"
              />
              <Typography component="span" variant="body1">
                {t("Addis Ababa")}, {t("Ethiopia")}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h6" paragraph>
              {t("Follow Us")}
            </Typography>
            <Box>
              <Link
                style={{ padding: 4 }}
                to={{
                  pathname: "https://www.facebook.com/tuorismcultureethiopia",
                }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faFacebook} className="fa-3x link" />
              </Link>
              <Link
                style={{ padding: 4 }}
                to={{
                  pathname: "https://www.facebook.com/tuorismcultureethiopia",
                }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="fa-3x link" />
              </Link>
              <Link
                style={{ padding: 4 }}
                to={{
                  pathname: "https://www.facebook.com/tuorismcultureethiopia",
                }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTelegram} className="fa-3x link" />
              </Link>
              <Link
                style={{ padding: 4 }}
                to={{
                  pathname: "https://www.facebook.com/tuorismcultureethiopia",
                }}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTwitter} className="fa-3x link" />
              </Link>
            </Box>
          </Box>
        </Box>
        <hr
          style={{
            margin: "5px auto",
          }}
        />
        <Box>
          <Typography variant="subtitle1">
            <FontAwesomeIcon icon={faCopyright} style={{ marginRight: 4 }} />
            {t("Moct All Rights Reserved")}.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
