import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { LanguageContext, StoreContext } from "../../context/context";
import { newsDispatch } from "../../store/Actions/newsActions";
import ErrorLoading from "../layouts/ErrorLoading";
import { DotLoading } from "../layouts/Loading";
import { NewsCard } from "./newsCard";
export const NewsSection = withRouter(({ history }) => {
  const { news: News, dispatchNews } = useContext(StoreContext);
  const { state: NewS, loading: loadingNews, error } = News;
  const [page, setPage] = useState(1);
  const mobile = useMediaQuery("(max-width: 680px)");
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    newsDispatch(dispatchNews, page);
  }, [page, dispatchNews]);
  const [news, setNews] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    setNews(NewS[0] ?? []);
    setPageCount(Math.ceil((NewS[1] ?? 0) / 4));
  }, [NewS]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      paddingX={mobile ? 4 : 8}
      py={2}
      sx={{ background: "#e5e5e5", minHeight: 200 }}
    >
      {loadingNews ? (
        <DotLoading />
      ) : error ? (
        <ErrorLoading />
      ) : (
        <>
          <Box display="flex" p={2}>
            <Typography variant="h2">{t("News")}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: { xs: "space-evenly", lg: "start" },
            }}
          >
            {news.length ? (
              news.map((newsArticle) => (
                <NewsCard key={news._id} news={newsArticle} />
              ))
            ) : (
              <Container>
                <Typography variant="h4" style={{ fontWeight: 100 }}>
                  {t("No news  registered yet")}
                </Typography>
              </Container>
            )}
          </Box>
          <Box display="flex" justifyContent="end" p={2}>
            <Pagination
              count={pageCount}
              variant="rounded"
              color="primary"
              page={page}
              onChange={handlePageChange}
            ></Pagination>
          </Box>
        </>
      )}
    </Box>
  );
});
