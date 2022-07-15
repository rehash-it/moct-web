import { Box } from "@material-ui/core";
import Footer from "./Footer";
import Navbar from "./navbar";

export const MainLayout = ({ children }) => (
  <Box minHeight="100vh" display="flex" flexDirection="column">
    <Navbar />
    <Box flexGrow={1}>{children}</Box>
    <Footer />
  </Box>
);
