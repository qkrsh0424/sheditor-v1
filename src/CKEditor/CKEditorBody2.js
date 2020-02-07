import React,{useState, useEffect} from 'react';

//uuid
import uuidv1 from 'uuid/v1';

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
            Underline
        ],
        toolbar: [ 
            'heading','bold', 'italic','underline', 'link', 'bulletedList', 'numberedList','|',
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

    const [moduleData, setModuleData] = useState([]);

    // Editor Data Change handler
    const handleEditorDataChange = ( evt, moduler) =>{
        // console.log(type);
        console.log(evt);
        console.log(moduler);
        // setEditorData(editor.getData());
        // for(let i = 0 ; i < moduleData.length; i++){
        //     if(moduleData[i].id===editor.id){
        //         setEditorData(
        //             moduleData[i].editorData.push(editor.getData())
        //         );
        //     }
        // }
        for(let i = 0 ; i< moduleData.length;i++){
            if(moduleData[i].id === moduler.id){
                moduleData[i].editorData = moduler.editor.getData();
            }
        }
    }

    // Editor Data Initialize handler
    const handleEditorInit = ( editor, id ) => {
        // setEditor(editor);

        // setEditorData(editor.getData());
        console.log(editor);
        console.log(id);
        
        for(let i = 0 ; i< moduleData.length;i++){
            if(moduleData[i].id === id){
                moduleData[i].editor = editor;
                moduleData[i].editorData = editor.getData();
            }
        }
        
    }

    const handleOnButtonClick = (moduler) =>{
        // console.log(editor.getData());
        console.log(moduler.id);
        console.log(moduler.editorData);
        console.log(getClearText(moduler.editorData));
    }
    const handleOnButtonClickAllData = () =>{
        // console.log(editor.getData());
        for(let i = 0; i< moduleData.length; i++){
            console.log('-----------------------------------');
            console.log('id : ', moduleData[i].id);
            console.log('editor : ', moduleData[i].editor);
            console.log('editorData : ', moduleData[i].editorData);
            console.log('pureData : ', getClearText(moduleData[i].editorData));
            console.log('-----------------------------------');
        }
    }

    const handleAddEditor = () =>{
        setModuleData(
            [
                ...moduleData,
                {
                    id:uuidv1(),
                    editor:null,
                    editorData:''
                }
            ]
            
        )
    }

    return(
        <div className='container'>
            {console.log(moduleData)}
            {moduleData ? moduleData.map((editorRow)=>{
                console.log(editorRow);
                return(
                    <div>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorRow.editorData}
                            config={editorConfiguration}
                            onChange={(e)=>handleEditorDataChange(e, editorRow)}
                            onInit={(e)=>handleEditorInit(e, editorRow.id)}
                            // readOnly={true}
                        />
                        <div dangerouslySetInnerHTML={ {__html: editorRow.editorData} }>
                        </div>
                        <button type='button' onClick={()=>handleOnButtonClick(editorRow)}> check data </button>
                    </div>
                );
                
            }):''}
                
                <button type='button' onClick={handleOnButtonClickAllData}> check all data </button>
                <button type='button' onClick={handleAddEditor}> add Editor </button>

                
        </div>
    );
}

function getClearText( strSrc ) {

    return  strSrc.replace( /<[^<|>]+?>/gi,'' );
}

export default CKEditorBody;