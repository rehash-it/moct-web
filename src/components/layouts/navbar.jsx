import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, withRouter } from "react-router-dom";
import { AppDrawer } from "../navbar/drawer";
import { LanguageSelect } from "../navbar/languageSelect";
import { Logo } from "../navbar/logo";
import { NavbarLink } from "../navbar/navbarLink";
import { SearchButton } from "../navbar/searchButton";

export default withRouter(({ match, history }) => {
  const mobile = useMediaQuery("(max-width: 680px)");
  const links = [
    {
      text: "Home",
      route: "/",
    },
    {
      text: "About",
      children: [
        {
          text: "Vision",
          route: "/about",
        },
        {
          text: "Historical Background",
          route: "/history",
        },
        {
          text: "Message of Moct",
          route: "/messageOfMoct",
        },
        {
          text: "Organization Chart",
          route: "/chart",
        },
      ],
    },
    {
      text: "News",
      route: "/news",
    },
    {
      text: "Attraction sites",
      route: "/sites",
      nested: true,
      children: [
        {
          text: "All",
          route: "?region=All",
        },
        {
          text: "Oromia",
          route: "?region=Oromia",
        },
        {
          text: "Amhara",
          route: "?region=Amhara",
        },
        {
          text: "Harari",
          route: "?region=Harari",
        },
        {
          text: "SNNPR",
          route: "?region=Snnpr",
        },
        {
          text: "Afar",
          route: "?region=Afar",
        },
        {
          text: "Sidama",
          route: "?region=Sidama",
        },
        {
          text: "Diredewa",
          route: "?region=Diredawa",
        },
        {
          text: "Gambela",
          route: "?region=Gambela",
        },
        {
          text: "Addis Ababa city",
          route: "?region=A.A",
        },
        {
          text: "Tigrai",
          route: "?region=Tigrai",
        },
        {
          text: "Bensahangul gumuz",
          route: "?region=gumuz",
        },
      ],
    },
    {
      text: "Vacancy",
      route: "/vacancy",
    },
    {
      text: "Bids",
      route: "/bids",
    },
    {
      text: "Forums",
      route: "/forums",
    },
    {
      text: "Research",
      route: "/docs",
    },
  ];
  return (
    <AppBar color="transparent" position="relative" id="top">
      <Container className="pa-4" maxWidth="xl">
        <Toolbar
          style={{
            height: mobile ? "auto" : "15vh",
            padding: "1rem 5px",
            justifyContent: mobile ? "start" : "space-between",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              mr: 1,
              p: {
                xs: 1,
                md: 2,
              },
            }}
          >
            <AppDrawer links={links} />
          </Box>
          <Link to="/">
            <Logo width={mobile ? "20vh" : "30vh"} />
          </Link>
          <Box
            justifyContent="space-evenly"
            flexGrow={1}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            {links.map((link) => (
              <NavbarLink link={link} key={link.text} />
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <LanguageSelect />
          <SearchButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
});
