import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addBlog, addBlogImage } from '../../Config/BlogApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { useAuth } from '../../pages/Login/AuthProvider';

const AddNewBlog = ({ show, handleClose, onAddBlog }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailRef, setThumbnailRef] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [imageRef, setImageRef] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const quillRef = useRef(null);
    const { user } = useAuth();
    const userId = user.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBlog = {
            title,
            content,
            thumbnail,
            publishDate: new Date().toISOString().split('T')[0],
            userId: userId,
        };

        try {
            const addedBlog = await addBlog(newBlog);
            await uploadBytes(thumbnailRef, thumbnailFile);
            const addedImage = await addBlogImage({ blogId: addedBlog.blogId, imagePath });
            await uploadBytes(imageRef, imageFile);
            onAddBlog(addedBlog);
            
            handleClose();
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
            const storageRef = ref(storage, `/blog/blogImages/${userId}/${file.name + Date.now()}`);
            try {
                setImageRef(storageRef);
                setImageFile(file);
                setImagePath(storageRef.fullPath);
                const imageUrl = await getDownloadURL(storageRef);
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            const storageRef = ref(storage, `blog/blogThumbnails/${userId}/${file.name + Date.now()}`);
            try {
                setThumbnailFile(file);
                setThumbnailRef(storageRef);
                setPreviewThumbnail(previewUrl);
                setThumbnail(storageRef.fullPath);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            // setToastMessage('Please upload a valid image file.');   
            // setShowToast(true);
        }
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBlogImage">
                        <Form.Label>Shop Thumbnail</Form.Label>
                        <div>
                            <Form.Control type="file" accept="image/*" onChange={handleThumbnailChange} />
                            {previewThumbnail && <img src={previewThumbnail} alt="Blog Thumbnail" style={{ width: '100px', margin: '5px' }} />}
                        </div>
                    </Form.Group>
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
                            ref={quillRef}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Blog
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewBlog;