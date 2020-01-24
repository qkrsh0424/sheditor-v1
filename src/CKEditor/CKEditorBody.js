import React,{useState} from 'react';

//CKEditor
import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

//CKEditor-plugins
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

// 원문
const editor = null;



const CKEditorBody = () =>{
    const [value,setValue] = useState('<h1>hihi</h1>');
    
    const editorConfiguration = {
        plugins: [ Essentials, Bold, Italic, Paragraph ],
        toolbar: [ 'bold', 'italic' ]
    };

    //원문
    const [editor, setEditor] = useState(null);
    const [editorData,setEditorData] = useState('<h2>Check our last minute deals!</h2>');

    // 원문
    const handleEditorDataChange = ( evt, editor ) =>{
        // this.setState( {
        //     editorData: editor.getData()
        // } );
        setEditorData(editor.getData());
    }

    const handleEditorInit = ( editor ) => {
        setEditor(editor);

        // this.setState( {
        //     editorData: editor.getData()
        // } );

        setEditorData(editor.getData());
        // CKEditor 5 inspector allows you to take a peek into the editor's model and view
        // data layers. Use it to debug the application and learn more about the editor.

        // CKEditorInspector.attach( editor );
    }

    const handleOnButtonClick = () =>{
        console.log(editor);
        console.log(editorData);
    }

    return(
        <>
            <h2>Using CKEditor 5 Framework in React</h2>
                <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    // config={editorConfiguration}
                    config={ {
                        plugins: [ Essentials, Paragraph, Bold, Italic, Heading ],
                        toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo', ]
                    } }
                    onChange={handleEditorDataChange}
                    onInit={handleEditorInit}
                />
                <button type='button' onClick={handleOnButtonClick}> click </button>
        </>
    );
}

export default CKEditorBody;