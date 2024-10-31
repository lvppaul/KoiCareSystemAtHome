import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Breadcrumb,
} from "react-bootstrap";
import { getNewsById } from "../../Config/NewsApi";
import { format } from "date-fns";

const NewsDetail = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(newsId);
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Error fetching news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!news) {
    return (
      <Container>
        <Alert variant="warning">news not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="news-detail-container py-4" fluid>
      <Container className="d-flex flex-column justify-content-between">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/news">News</Breadcrumb.Item>
            <Breadcrumb.Item active>{news.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <hr
          style={{
            height: "3px",
            backgroundColor: "#000000",
            border: "none",
          }}
        />
        <Container
          className="py-3"
          style={{ backgroundColor: "white", borderRadius: "10px" }}
        >
          <Row>
            <Col>
              <h1 style={{fontWeight: 'bolder'}}>{news.title}</h1>
              <p style={{fontWeight: 'bold', color: 'gray'}}>
                Published on:{" "}
                {format(new Date(news.publishDate), "MMMM dd, yyyy - hh:mm a")}{" "}
              </p>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default NewsDetail;
