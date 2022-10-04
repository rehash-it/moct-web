import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
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
  const mobile = useMediaQuery("(max-width: 680px)");

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
    <Box paddingX={mobile ? 4 : 8} py={2}>
      <Box display="flex" flexDirection="column">
        <Box p={2}>
          <Typography variant="h2">{t("Attraction sites")}</Typography>
        </Box>
        <Box>
          {sites.length ? (
            <ImageList gap={5} style={{ alignSelf: "center" }}>
              {sites.data.map((site) => (
                <ImageListItem key={site._id}>
                  <img src={site.images[0]} alt={site.title} />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Container>
              <Typography variant="h4" style={{ fontWeight: 100}}>
                {t("No Attraction site registered yet")}
              </Typography>
            </Container>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="end" px={4} py={2}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, value) => setPage(value)}
          variant="rounded"
        ></Pagination>
      </Box>
    </Box>
  );
});
