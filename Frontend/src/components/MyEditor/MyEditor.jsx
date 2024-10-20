import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
  [{size: []}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link', 'image'],
  ['clean']
];

function MyEditor() {
  const [value, setValue] = useState('');

  return (
      <ReactQuill 
        value={value} 
        onChange={setValue} 
        modules={{ toolbar: toolbarOptions }}
      />
  );
}

export default MyEditor;