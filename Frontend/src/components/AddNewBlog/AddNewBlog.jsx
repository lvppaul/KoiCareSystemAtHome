import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addBlog } from '../../Config/BlogApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../API/firebase';

const AddNewBlog = ({ onAddBlog }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const quillRef = useRef(null); // Create a ref using useRef

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBlog = {
            title,
            content,
            publishDate: new Date().toISOString().split('T')[0], // Assuming publishDate is in YYYY-MM-DD format
            userId: 'currentUserId', // Replace with actual user ID
        };
        try {
            const token = 'your-auth-token'; // Replace with actual token
            const addedBlog = await addBlog(token, newBlog);
            onAddBlog(addedBlog);
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const storageRef = ref(storage, `/blog/blogImages/${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                const imageUrl = await getDownloadURL(storageRef);

                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: handleImageUpload
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder="Enter content"
                    theme="snow"
                    modules={modules}
                    ref={quillRef} // Assign the ref to ReactQuill
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Blog
            </Button>
        </Form>
    );
};

export default AddNewBlog;