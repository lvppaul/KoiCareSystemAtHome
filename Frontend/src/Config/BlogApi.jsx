import api from './AxiosConfig';

// Function to get blogs
const getBlogs = async () => {
    try {
        const response = await api.get('Blog', {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

// Function to get a blog by blog ID
const getBlogByBlogId = async (blogId) => {
    try {
        const response = await api.get(`Blog/async/${blogId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
    }
}

// Function to add a new blog
const addBlog = async (data) => {
    try {
        const response = await api.post('Blog', data, {
            headers: {
                'accept': 'text/plain'
            }
        });
        console.log('response:', response);
        return response.data;
    } catch (error) {
        console.error('Error adding blog:', error);
        throw error;
    }
};

// Function to add blog images
const addBlogImages = async ({ blogId, imageUrl }) => {
    try {
        const response = await api.post('BlogImage', { blogId, imageUrl }, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding blog image:', error);
        throw error;
    }
}

// Function to get comments for a blog
const getComments = async (blogId) => {
    try {
        const response = await api.get(`BlogComment/BlogId/${blogId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// Function to add a new comment
const addComment = async (data) => {
    try {
        const response = await api.post('BlogComment', data, {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export { getBlogs, getBlogByBlogId, addBlog, getComments, addComment, addBlogImages };