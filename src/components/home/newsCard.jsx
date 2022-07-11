import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "../../styles/newsCard.module.css";
import { tellDate } from "../utility/Date";

export const NewsCard = withRouter(({ history, news }) => {
  const medium = useMediaQuery("(max-width: 1020px)");
  const [newsImage, setNewsImage] = useState("");

  useEffect(() => {
    if (news.images.length) {
      setNewsImage(news.images[0]);
    }
  }, [news.images]);

  return (
    <Box mb={4} p={medium ? 2 : 4} sx={{ bgcolor: "#e5e5e5" }}>
      <Card
        style={{ width: medium ? "80vw" : 400, background: "#e5e5e5" , height: 400}}
        variant="outlined"
      >
        {newsImage && (
          <CardMedia
            component="img"
            height="200"
            image={newsImage}
            alt={news.title}
          />
        )}
        <CardContent
          onClick={() => history.push(`/news/${news._id}`)}
          style={{ height: 150 }}
        >
          <Typography variant="h5" gutterBottom>
            {news.title}
          </Typography>
          <Typography variant="body1" className={styles.newsContent} paragraph>
            {news.content.slice(0, 350)}
          </Typography>
          <div></div>
        </CardContent>
        <CardActions>
          <FontAwesomeIcon icon={faClock} className="mx-2 " />
          <Typography
            component="span"
            variant="body2"
            style={{ fontWeight: 300 }}
          >
            {tellDate(news.createdAt)}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
});
