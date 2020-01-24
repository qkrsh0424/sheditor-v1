import React,{useState, useEffect} from 'react';
import styled from 'styled-components';

//Core
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

//Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';

//Draft Js
import { EditorState,convertToRaw } from 'draft-js';
import DfjEditor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

//Component
import UploadImageList from './UploadImageList';

// Container Style Part
const Container = styled.div`

`;

const HeaderContainer = styled.div`

`;

const BodyContainer = styled.div`

`;

// Wrapper Style Part
const HeaderWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
    margin-top:8px;
    padding:15px;
`;

const BodyWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
    margin-top:8px;
    padding:15px;
`;

const TextFieldWrapper = styled.div`
    padding:8px;
    border-radius:15px;
    margin: 8px 0;
    border:1px solid #f1f1f1;
`

const EditorWrapper = styled.div`
    border : 1px dotted rgba(0,0,0,0.125);
    margin: 8px 0;
`;

// Box Style Part
const InformationBox = styled.div`
    border-radius: 0.25rem;
    border:1px solid #c4c4c4;
    padding: 8px;
`;

const TitleBox = styled.div`

`;

const EditorBox = styled.div`
    border-radius: 0.25rem;
    border:1px solid #c4c4c4;
    padding: 8px;
`

const AddModulerButtonBox = styled.div`
    text-align:center;
    margin:8px 0;
    padding 8px;
`;

const UploadImageBox = styled.div`
    // border-radius: 0.25rem;
    // border:1px solid #c4c4c4;
    // padding: 8px;

    border:1px solid #f1f1f1;
    border-radius:15px;
    padding: 8px;
    margin:8px 0;
    
    .uploadedImage{
        width:90px;
        height:90px
        border:1px solid #f1f1f1;
        margin:2px;
    }

    .uploadedImage:hover{
        border:1px solid blue;
    }
`

const TextFieldBox = styled.div`
    cursor: pointer;
`

// Element Style Part
const TitleInput = styled(TextField)`

`;

const AddModulerButton = styled(IconButton)`
    border:1px solid #f1f1f1 !important;
    margin:0 4px !important;
`;


const EditorBody = (props) =>{
    const {
        postModule
    } = props;

    const {
        addPostModule,
        deletePostModule,
        handleUploadImage,
        onImageUpload,
        handleDeleteImage,
        _handleEditorDialOpen
    } = props;


    const [editorState, setEditorState ] = useState(EditorState.createEmpty());
    //DraftJs Element
    const [{ plugins, Toolbar }] = useState(() => {
        const toolbarPlugin = createToolbarPlugin();
        const { Toolbar } = toolbarPlugin;
        const plugins = [toolbarPlugin];
        return {
            plugins,
            Toolbar
        };
    });
    return(
        <Container>
            {console.log(postModule)}
            <HeaderContainer className='container'>
                <HeaderWrapper>
                    <InformationBox>
                        <div>
                            작성지 : 메인
                        </div>
                        <div>
                            작성자 : 훈
                        </div>
                    </InformationBox>
                    <TitleBox>
                        <TitleInput
                            id="editorTitleInput"
                            label="주제"
                            placeholder="Placeholder"
                            // helperText="Full width!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            // value={props.postTitle}
                            // onChange={props._handlePostTitleChange}
                            required
                        />
                    </TitleBox>
                </HeaderWrapper>
            </HeaderContainer>
            <BodyContainer className='container'>
                <BodyWrapper>
                    <AddModulerButtonBox>
                        <AddModulerButton
                            type='button'
                            onClick = {()=>addPostModule('head')}
                        >
                            <AddIcon />
                        </AddModulerButton>
                    </AddModulerButtonBox>
                    {postModule && postModule.map((post, index)=>{
                        return(
                            <EditorWrapper>
                                
                                <EditorBox>
                                    <span className='text-primary'>{index+1} </span>
                                    <span className='text-success'>Module number : {post.id}</span>
                                </EditorBox>
                                <UploadImageBox>
                                    <UploadImageList
                                        moduleId = {post.id}
                                        imageList = {post.imageList}

                                        handleUploadImage = {handleUploadImage}
                                        onImageUpload = {onImageUpload}
                                        handleDeleteImage = {handleDeleteImage}
                                    />
                                </UploadImageBox>
                                <TextFieldWrapper>
                                    <TextFieldBox
                                        className="editor"
                                        onClick={()=>_handleEditorDialOpen(post)}
                                    >
                                        {post.editorState && 
                                            <DfjEditor
                                                key={post.id}
                                                editorState={post.editorState}
                                                plugins={plugins}
                                                onChange={handleDeleteImage}
                                                placeholder='클릭'
                                                readOnly
                                            />
                                        }
                                        
                                    </TextFieldBox>


                                    {/* <TextField
                                        id="standard-multiline-static"
                                        label="클릭해 주세요"
                                        multiline
                                        onClick={handleInputClick}
                                        // value={}
                                        // onChange={handleChangeDescription}
                                        placeholder=""
                                        fullWidth
                                    /> */}
                                    
                                </TextFieldWrapper>
                                <AddModulerButtonBox>
                                    <AddModulerButton
                                        type='button'
                                        onClick = {()=>addPostModule(post.id)}
                                    >
                                        <AddIcon />
                                    </AddModulerButton>
                                    <AddModulerButton
                                        type='button'
                                        onClick = {()=>deletePostModule(post.id)}
                                    >
                                        <DeleteIcon />
                                    </AddModulerButton>
                                </AddModulerButtonBox>
                            </EditorWrapper>
                        );
                    })}
                    
                    
                </BodyWrapper>
            </BodyContainer>
        </Container>
    );
}

export default EditorBody;