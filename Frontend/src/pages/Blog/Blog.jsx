import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { getBlogs } from '../../Config/AxiosConfig';
import AddNewBlog from '../../components/AddNewBlog/AddNewBlog';
import './Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddBlog, setShowAddBlog] = useState(false);
    const blogsPerPage = 12;

    useEffect(() => {
        getBlogs()
            .then(data => {
                console.log('Fetched blogs:', data);
                setBlogs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            });
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
        setShowAddBlog(false);
    };

    return (
        <Container>
            <h1>Blogs</h1>
            <Button variant="primary" onClick={() => setShowAddBlog(true)}>Add New Blog</Button>
            {showAddBlog && <AddNewBlog onAddBlog={handleAddBlog} />}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <ul className="blogList">
                        {currentBlogs.map(blog => (
                            <li key={blog.blogId} className="blogItem">
                                <Link to={`/blog/${blog.blogId}`} className="blogLink">
                                    <h2>{blog.title}</h2>
                                    <p>{blog.content.substring(0, 100)}...</p>
                                    <p>Published on: {blog.publishDate}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="blog-pagination">
                        <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button variant="secondary" onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</Button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Blog;