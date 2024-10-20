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

const addBlogImage = async (data) => {
    try {
        const response = await api.post('BlogImage', data, {
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
        const response = await api.get(`BlogComment?blogId=${blogId}`, {
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
const addComment = async (token, data) => {
    try {
        const response = await api.post('BlogComment', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export { getBlogs, getBlogByBlogId, addBlog, getComments, addComment, addBlogImage };