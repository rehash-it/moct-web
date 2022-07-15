import { Box, useMediaQuery } from "@material-ui/core";
import { useContext } from "react";
import { LanguageContext } from "../../context/context";
import styles from "../../styles/titlebar.module.scss";

export const TitleBar = ({ text }) => {
  const mobile = useMediaQuery("(max-width: 680px)");
  const { t } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        paddingX: mobile? 6: 10,
        paddingY: 2,
        display: 'flex',
        alignItems: 'end',
        height: mobile? 100: 200
      }}
      className={styles.titlebar}
      display="flex"
      alignItems="end"
    >
      <h1 style={{ color: "#fff" }}>{t(text)}</h1>
    </Box>
  );
};
