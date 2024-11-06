import React, { forwardRef, useImperativeHandle } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { useAuth } from '../../pages/Login/AuthProvider';

const CKEditorComponent = forwardRef(({ value, onChange, uploadPath, onImageUpload }, ref) => {
    const { user } = useAuth();
    const userId = user.userId;

    class CustomUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file
                .then(file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const path = `${uploadPath}/${userId}/${file.name + Date.now()}`;
                        const storageReference = storageRef(storage, path);
                        try {
                            await uploadBytes(storageReference, file);
                            const imageUrl = await getDownloadURL(storageReference);
                            resolve({ default: imageUrl, path });
                            if (onImageUpload) {
                                onImageUpload(path);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    };
                    reader.readAsDataURL(file);
                }));
        }

        abort() {
        }
    }

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader);
        };
    }

    useImperativeHandle(ref, () => ({
        focus: () => {
        }
    }));

    return (
        <CKEditor
            editor={ClassicEditor}
            data={value || ''}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
            onError={(error) => {
                console.error('CKEditor error:', error);
            }}
            config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                toolbar: [
                    'heading', '|', 
                    'bold', 'italic','|', 
                    'fontSize', 'highlight', '|',
                    'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 
                    'imageUpload', '|', 
                    'undo', 'redo', '|',
                    'removeFormat'
                ],
            }}
        />
    );
});

export default CKEditorComponent;