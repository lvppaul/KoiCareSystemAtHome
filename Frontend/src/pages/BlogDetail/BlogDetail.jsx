import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogByBlogId } from "../../Config/BlogApi";
import CommentSection from "../../components/CommentSection/CommentSection";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Breadcrumb,
} from "react-bootstrap";
import { format } from "date-fns";
import { getAccountByUserId } from "../../Config/UserApi";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await getBlogByBlogId(blogId);
        const user = await getAccountByUserId(blogs.userId);
        const updatedBlog = { ...blogs, userName: `${user.firstName} ${user.lastName}` };
        setBlog(updatedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Error fetching blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

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

  if (!blog) {
    return (
      <Container>
        <Alert variant="warning">Blog not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="blog-detail-container py-4">
      <Container className="d-flex flex-column justify-content-between">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/blogs">Blogs</Breadcrumb.Item>
            <Breadcrumb.Item active>{blog.title}</Breadcrumb.Item>
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
              <h1 style={{ fontWeight: "bolder" }}>{blog.title}</h1>
              <p style={{ fontWeight: "bold"}}>Author: {blog.userName}</p>
              <p style={{ fontWeight: "bold", color: "gray" }}>
                Published on:{" "}
                {format(new Date(blog.publishDate), "MMMM dd, yyyy - hh:mm a")}{" "}
              </p>
              <hr /> <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Col>
          </Row>
          <Row className="mt-3">
            <CommentSection blogId={blog.blogId} userId={blog.userId} />
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default BlogDetail;
