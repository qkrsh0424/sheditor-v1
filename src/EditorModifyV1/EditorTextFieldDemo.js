import React,{useState, useEffect} from 'react';

//styled-components
import styled from 'styled-components';

//CKEditor
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

//CKEditor-plugins
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
//basic styles
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

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
        Underline
    ],
    toolbar: {
        items:[ 
            'heading','bold', 'italic','underline', 'link', 'bulletedList', 'numberedList','|',
            'alignment','blockQuote','|',
            'fontColor',
            'fontSize',
            'fontFamily',
            'fontBackgroundColor'
        ]
    },

    heading: {
        options: [
            { model: 'paragraph', title: '문단', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: '헤드라인 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: '헤드라인 2', class: 'ck-heading_heading2' }
        ]
    },
    language: 'ko',
};

const EditorContainer = styled.div`
    .ck-content{
        height:300px !important;
    }
`;

const CKEditorBody = (props) =>{
    const {
        editorData
    } = props;

    const {
        handleEditorDataChange,
        handleEditorInit
    } = props;
    

    return(
        <EditorContainer className={window.innerWidth<=900?'':'container'}>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={editorConfiguration}
                onChange={handleEditorDataChange}
                onInit={handleEditorInit}
            />
        </EditorContainer>
    );
}

function getClearText( strSrc ) {

    return  strSrc.replace( /<[^<|>]+?>/gi,'' );
}

export default CKEditorBody;