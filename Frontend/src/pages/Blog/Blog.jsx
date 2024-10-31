import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Pagination, Card, Spinner } from 'react-bootstrap';
import { getBlogs } from '../../Config/BlogApi';
import AddNewBlog from '../../components/AddNewBlog/AddNewBlog';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { formatDistanceToNow } from 'date-fns';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddBlogModal, setShowAddBlogModal] = useState(false);
    const blogsPerPage = 6;

    const fetchBlogs = async () => {
        try {
            const blogs = await getBlogs();
            const updatedBlogs = await Promise.all(blogs.map(async blog => {
                if (blog.thumbnail) {
                    try {
                        const storageRef = ref(storage, blog.thumbnail);
                        blog.thumbnail = await getDownloadURL(storageRef);
                    } catch (error) {
                        console.error('The file does not exist in firebase anymore!', error);
                        const storageRef = ref(storage, 'others/NotFound.jpg');
                        blog.thumbnail = await getDownloadURL(storageRef);
                    }
                }
                return blog;
            }));
            setBlogs(updatedBlogs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        };
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalBlogs = blogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

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

    const handleAddBlog = (newBlog) => {
        setBlogs([newBlog, ...blogs]);
        setShowAddBlogModal(false);
    };

    return (
        <Container>
            <h1 className="d-flex justify-content-center mt-3" style={{ color: "#E47E39" }}>Blogs</h1>
            <Row className="mb-3">
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => setShowAddBlogModal(true)}>Write a Blog</Button>
                </Col>
            </Row>
            <AddNewBlog show={showAddBlogModal} handleClose={() => setShowAddBlogModal(false)} onAddBlog={handleAddBlog} />
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <Spinner animation="border" size="xl" role="status" />
                </div>
            ) : (
                <div>
                    <Row className="blogList">
                        {currentBlogs.map(blog => (
                            <Col key={blog.blogId} md={4} className="mb-4">
                                <Card>
                                    <Card.Img style={{ height: "100%", width: "100%", objectFit: "cover" }} variant="top" src={blog.thumbnail} alt={blog.title} />
                                    <Card.Body>
                                        <Card.Title className="mb-2">{blog.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Published {formatDistanceToNow(new Date(blog.publishDate), { addSuffix: true })}
                                        </Card.Subtitle>
                                        <Button as={Link} to={`/blog/${blog.blogId}`} variant="primary" className="mt-auto">Read More</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Pagination>
                                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                                {[...Array(totalPages).keys()].map(number => (
                                    <Pagination.Item
                                        key={number + 1}
                                        active={number + 1 === currentPage}
                                        onClick={() => setCurrentPage(number + 1)}
                                    >
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                            </Pagination>
                        </Col>
                    </Row>
                </div>
            )}
        </Container >
    );
};

export default Blog;