import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogs } from '../../API/AxiosConfig';
import CommentSection from '../../components/CommentSection/CommentSection';
import './BlogDetail.css';

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(data => {
        const foundBlog = data.find(blog => blog.blogId === blogId);
        setBlog(foundBlog);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setLoading(false);
      });
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Published on: {blog.publishDate}</p>
      <CommentSection blogId={blog.blogId} />
    </div>
  );
};

export default BlogDetail;