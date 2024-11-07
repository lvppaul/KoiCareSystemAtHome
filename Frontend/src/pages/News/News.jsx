import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Pagination,
  Card,
  Spinner,
} from "react-bootstrap";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { formatDistanceToNow } from "date-fns";
import { getAllNews } from "../../Config/NewsApi";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  const fetchNews = async () => {
    try {
      const newsList = await getAllNews();
      const updatedNews = await Promise.all(
        newsList.map(async (news) => {
          if (news.thumbnail) {
            try {
              const storageRef = ref(storage, news.thumbnail);
              news.thumbnail = await getDownloadURL(storageRef);
            } catch (error) {
              console.error(
                "The file does not exist in firebase anymore!",
                error
              );
              const storageRef = ref(storage, "others/NotFound.jpg");
              news.thumbnail = await getDownloadURL(storageRef);
            }
          }
          return news;
        })
      );
      setNews(updatedNews);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalNews = news.length;
  const totalPages = Math.ceil(totalNews / newsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <h1
        className="d-flex justify-content-center mt-3 mb-3"
        style={{ color: "#E47E39" }}
      >
        News
      </h1>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" size="xl" role="status" />
        </div>
      ) : (
        <div>
          <Row className="newsList">
            {currentNews.map((news) => (
              <Col key={news.newsId} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    variant="top"
                    src={news.thumbnail}
                    alt={news.title}
                  />
                  <Card.Body>
                    <Card.Title className="mb-2">{news.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Published{" "}
                      {formatDistanceToNow(new Date(news.publishDate), {
                        addSuffix: true,
                      })}
                    </Card.Subtitle>
                    <Button
                      as={Link}
                      to={`/news/${news.newsId}`}
                      variant="primary"
                      className="mt-auto"
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => setCurrentPage(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default News;
