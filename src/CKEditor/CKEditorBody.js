import React,{useState} from 'react';

//CKEditor
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

//CKEditor-plugins
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';

const CKEditorBody = () =>{
    
    // CKEditor plugins
    const editorConfiguration = {
        plugins: [ 
            Essentials, 
            Alignment, 
            Paragraph,
            Bold, 
            Italic, 
            Heading,
            FontColor,
            FontSize,
            FontFamily,
            FontBackgroundColor,
            BlockQuote,
            Link,
            List,
        ],
        toolbar: [ 
            'heading','bold', 'italic', 'link', 'bulletedList', 'numberedList','|',
            'alignment','blockQuote','|',
            'fontColor',
            'fontSize',
            'fontFamily',
            'fontBackgroundColor'
        ],
        heading: {
            options: [
                { model: 'paragraph', title: '문단', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: '헤드라인 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: '헤드라인 2', class: 'ck-heading_heading2' }
            ]
        },
        language: 'ko',
    };

    // CKEditor state setting
    const [editor, setEditor] = useState(null);
    const [editorData,setEditorData] = useState('<h2>hello CKEditor</h2>');

    // Editor Data Change handler
    const handleEditorDataChange = ( evt, editor, type ) =>{
        console.log(type);
        console.log(evt);
        setEditorData(editor.getData());
    }

    // Editor Data Initialize handler
    const handleEditorInit = ( editor ) => {
        setEditor(editor);

        setEditorData(editor.getData());
        // CKEditor 5 inspector allows you to take a peek into the editor's model and view
        // data layers. Use it to debug the application and learn more about the editor.

        // CKEditorInspector.attach( editor );
    }

    const handleOnButtonClick = () =>{
        console.log(editor.getData());
        console.log(editorData);
        console.log(getClearText(editorData));
    }

    function getClearText( strSrc ) {

        return  strSrc.replace( /<[^<|>]+?>/gi,'' );
    }

    return(
        <div className='container'>
            <h2>Using CKEditor 5 Framework in React</h2>
                <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    config={editorConfiguration}
                    onChange={(e)=>handleEditorDataChange(e, editor, '1')}
                    onInit={handleEditorInit}
                    // readOnly={true}
                />
                <button type='button' onClick={handleOnButtonClick}> check data </button>

                <div dangerouslySetInnerHTML={ {__html: editorData} }>
                </div>
        </div>
    );
}

export default CKEditorBody;