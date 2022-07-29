import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { LanguageContext } from "../../context/context";
import { sitesDispatch } from "../../store/Actions/fetchSites";
import DataLoading from "../layouts/DataLoading";
import ErrorLoading from "../layouts/ErrorLoading";

export const SitesSection = withRouter(({ history }) => {
  const [sites, setSite] = useState({
    data: [],
    loading: true,
    error: false,
    length: 0,
  });
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    sitesDispatch(setSite, { region: "All", page: page, limit: 6 });
  }, [page]);

  useEffect(() => {
    setPageCount(Math.ceil(sites.length / 6));
  }, [sites.length]);

  const { t } = useContext(LanguageContext);

  return sites.loading ? (
    <DataLoading />
  ) : sites.error ? (
    <ErrorLoading />
  ) : (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column">
        <Box p={2}>
          <Typography variant="h2">{t("Attraction Sites")}</Typography>
        </Box>
        <ImageList gap={5} style={{ alignSelf: "center" }}>
          {sites.data.map((site) => (
            <ImageListItem key={site._id}>
              <img src={site.images[0]} alt={site.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box display="flex" justifyContent="end" px={4} py={2}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, value) => setPage(value)}
          variant="rounded"
        ></Pagination>
      </Box>
    </Container>
  );
});
