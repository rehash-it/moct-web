import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, useMediaQuery } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { LanguageContext } from "../../context/context";

export const SearchButton = withRouter(({ match, history }) => {
  const path = match.path.split("/")[1];
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState(() => {
    if (path === "search") {
      localStorage.getItem("index");
    }
  });
  useEffect(() => {
    localStorage.setItem("index", query || null);
  }, [query]);

  const { t } = useContext(LanguageContext);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      localStorage.setItem("index", query);
      history.push("/search/" + query + "?p=1");
    } else {
      setSearch(!search);
    }
  };
  const mobile = useMediaQuery("(max-width: 680px)");
  return (
    <Box display="flex" justifyContent="end" maxWidth={200} style={{marginLeft: 'auto'}}>
      <form onSubmit={handleSearch}>
        {search && (
          <input
            type="text"
            className="form-control"
            autoFocus
            placeholder={t("type and hit enter")}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            style={{
              transition: 3,
            }}
          />
        )}
      </form>
      <IconButton
        className=" my-2"
        color="primary"
        size="small"
        onClick={handleSearch}
        style={{
          marginLeft: !mobile && !search ? 50 : 10,
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </IconButton>
    </Box>
  );
});
