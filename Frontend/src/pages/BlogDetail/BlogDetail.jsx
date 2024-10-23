import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogByBlogId } from '../../Config/BlogApi';
import CommentSection from '../../components/CommentSection/CommentSection';
import { Container, Row, Col, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import './BlogDetail.css';

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogByBlogId(blogId);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Error fetching blog. Please try again later.');
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
    <Container className="blog-detail-container">
      <Row className="mb-3">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/blogs">
              Blogs
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{blog.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      <Row>
        <Col>
          <h1>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <p>Published on: {blog.publishDate}</p>
          <CommentSection blogId={blog.blogId} />
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;