import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyEditor({value, onChange, modules}) {
  return (
      <ReactQuill 
        value={value} 
        onChange={onChange} 
        modules={modules}
      />
  );
}

export default MyEditor;