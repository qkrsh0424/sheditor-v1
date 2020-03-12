import React, { useState, useEffect } from 'react';

//styled-components
import styled from 'styled-components';

//Core
import Button from '@material-ui/core/Button';

//Icons
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js'
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
        Underline,
        HorizontalLine
    ],
    toolbar: {
        items: [
            'heading', 'bold', 'italic', 'underline', 'link', 'alignment','|',
            'fontColor','fontSize','fontFamily','fontBackgroundColor','|',
            'bulletedList', 'numberedList','blockQuote', 'horizontalline'
        ],
    },

    heading: {
        options: [
            { model: 'paragraph', title: '문단', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'H1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'H2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'H3', class: 'ck-heading_heading3' }
        ]
    },
    link:{
        decorators: {
            isExternal: {
                mode: 'automatic',
                callback: url => url.startsWith( 'http://' ),
            	attributes: {
            		target: '_blank',
            		rel: 'noopener noreferrer'
            	}
            },
        }
    },
    language: 'ko',
};

const EditorContainer = styled.div`
    .ck-content{
        height:300px !important;
    }
    .ck-button__label{
        width:3rem !important;
    }
`;

const ApplicationButtonBox = styled.div`
    margin:8px 0;
`;


const CKEditorBody = (props) => {
    const {
        selectedIndexData,
        editorDialOpen
    } = props;

    const {
        _handleEditorDialUpdate,
        _handleEditorDialClose,
        _handleEditorDialOpen,
        editorChange
    } = props;


    const [editor, setEditor] = useState(null);
    const [editorData, setEditorData] = useState(selectedIndexData.editorData);

    useEffect(() => {
        setEditorData(selectedIndexData.editorData);
    }, [selectedIndexData.id])

    // Editor Data Change handler
    const handleEditorDataChange = (e, editor) => {
        // console.log(e);
        setEditorData(editor.getData());
    }

    // Editor Data Initialize handler
    const handleEditorInit = (editor) => {
        // console.log('init : ', editor);

        setEditor(editor);
        if (selectedIndexData.editor) {
            setEditorData(selectedIndexData.editor.getData());
        } else {
            setEditorData(editor.getData());
        }
    }
    return (
        <EditorContainer
            className={window.innerWidth <= 900 ? '' : 'container'}
            className={'container'}
        >
            <div className='clearfix'>
                <h5 className='float-left'>모듈 넘버 : {selectedIndexData.id}</h5>
                <ApplicationButtonBox className='float-right'>
                    <Button
                        type='button'
                        variant='contained'
                        color='secondary'
                        // fullWidth={true}
                        size='large'
                        onClick={() => _handleEditorDialClose(selectedIndexData)}
                    >
                        <CancelIcon />
                    </Button>
                </ApplicationButtonBox>
            </div>

            {/* {console.log('textfield selected : ', selectedIndexData)} */}
            <div>
                <CKEditor
                    id='editor'
                    editor={ClassicEditor}
                    data={editorData}
                    config={editorConfiguration}
                    onChange={handleEditorDataChange}
                // onInit={handleEditorInit}
                // onInit = {(editor)=>setEditor(editor)}
                />
            </div>
            <ApplicationButtonBox>
                <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    fullWidth={true}
                    size='large'
                    onClick={() => _handleEditorDialUpdate(selectedIndexData, editor, editorData)}
                >
                    <SaveIcon />적용하기
                    </Button>
            </ApplicationButtonBox>


        </EditorContainer>
    );
}

function getClearText(strSrc) {

    return strSrc.replace(/<[^<|>]+?>/gi, '');
}

export default CKEditorBody;