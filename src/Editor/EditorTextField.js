import React, { useState, useEffect,useRef } from 'react';

//Core
import Button from '@material-ui/core/Button';

//draftjs
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

const EditorTextField = (props) => {
    // variable
    const {
        selectedIndexData
    } = props;

    // handler
    const {
        _handleSaveEditorState,
    } = props;

    // const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [{ plugins, Toolbar }] = useState(() => {
        const toolbarPlugin = createToolbarPlugin();
        const { Toolbar } = toolbarPlugin;
        const plugins = [toolbarPlugin];
        return {
            plugins,
            Toolbar
        };
    });

    const inputEl = useRef(null);

    // useEffect(() => {
    //     inputEl.current.focus();
    // },[])

    // const _handleEditorStateChange = (editorState) => {
    //     setEditorState(editorState);
    // }

    return (
        <div
            className="editor container"
            // onClick={() => props.editorRef.current && props.editorRef.current.focus()}
        >
                <Editor
                    // key={rows.indexName}
                    editorState={props.editorState}
                    onChange={props._handleEditorStateChange}
                    plugins={plugins}
                    ref={inputEl}
                // ref={(editor) => (props.editorRef.current = editor)}
                />
            
            <Toolbar />
            {/* <Button onClick={()=>_handleSaveEditorState(selectedIndexData, editorState)} color="primary">
                Save
            </Button> */}
        </div>
    );
}

export default EditorTextField;