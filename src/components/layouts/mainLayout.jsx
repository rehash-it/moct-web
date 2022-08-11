import { Box } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./navbar";

const MainLayout = ({ location,children }) => (
  <Box minHeight="100vh" display="flex" flexDirection="column">
    {location.pathname !== '/login'&& <Navbar />}
    <Box flexGrow={1}>{children}</Box>
    {location.pathname !== '/login'&& <Footer />}
  </Box>
);

export default withRouter(MainLayout)