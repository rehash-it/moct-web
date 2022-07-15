import { Box } from "@material-ui/core";
import { useContext } from "react";
import { LanguageContext } from "../../context/context";
import styles from "../../styles/titlebar.module.scss";

export const TitleBar = ({ text }) => {
  const { t } = useContext(LanguageContext);
  return (
    <Box
      paddingX={10}
      paddingY={2}
      className={styles.titlebar}
      height={200}
      display="flex"
      alignItems="end"
    >
      <h1 style={{ color: "#fff" }}>{t(text)}</h1>
    </Box>
  );
};
