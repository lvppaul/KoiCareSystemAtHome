import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addBlog, addBlogImages } from '../../Config/BlogApi';
import CKEditorComponent from '../CKEditorComponent/CKEditorComponent';
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
    const [imagePaths, setImagePaths] = useState([]);

    const { user } = useAuth();
    const userId = user.userId;

    const editorRef = useRef(null);
    const [error, setError] = useState('');

    const handleImageUpload = (path) => {
        setImagePaths(prevPaths => [...prevPaths, path]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content) {
            setError('Content is required.');
            return;
        }

        const newBlog = {
            title,
            content,
            thumbnail: thumbnailFile ? thumbnail : 'others/NotFound.jpg',
            publishDate: new Date().toISOString().split('T')[0],
            userId: userId,
        };

        try {
            const addedBlog = await addBlog(newBlog);
            if (thumbnailFile) {
                await uploadBytes(thumbnailRef, thumbnailFile);
            }

            for (let i = 0; i < imagePaths.length; i++) {
                console.log(`Adding image to blog: ${addedBlog.blogId}, Path: ${imagePaths[i]}`);
                await addBlogImages({ blogId: addedBlog.blogId, imageUrl: imagePaths[i] });
            }

            const newThumbnail = await getDownloadURL(ref(storage, addedBlog.thumbnail));
            onAddBlog({ ...addedBlog, thumbnail: newThumbnail });
            setTitle('');
            setContent('');
            setThumbnail('');
            setPreviewThumbnail('');
            setThumbnailFile(null);
            setThumbnailRef(null);
            setImagePaths([]);
            setError('');

            handleClose();
        } catch (error) {
            if (error.message === 'Request failed with status code 422') {
                setError("This title has already existed.");
            }
            console.error('Error adding blog:', error);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            const storageRef = ref(storage, `blog/blogThumbnails/${userId}/${Date.now()}_${file.name}`);
            try {
                setThumbnailFile(file);
                setThumbnailRef(storageRef);
                setPreviewThumbnail(previewUrl);
                setThumbnail(storageRef.fullPath);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Add New Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId="formBlogImage">
                        <Form.Label>Shop Thumbnail</Form.Label>
                        <div>
                            <Form.Control type="file" accept="image/*" onChange={handleThumbnailChange} />
                            {previewThumbnail && <img src={previewThumbnail} alt="Blog Thumbnail" style={{ width: '100px', margin: '5px' }} />}
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name='title'
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <p className="error-message mt-3">{error}</p>}
                    <Form.Group className='mb-3' controlId="formContent">
                        <Form.Label>Content</Form.Label>
                        <CKEditorComponent
                            ref={editorRef}
                            value={content}
                            onChange={setContent}
                            uploadPath="blog/blogImages"
                            onImageUpload={handleImageUpload}
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