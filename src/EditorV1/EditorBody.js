import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//URL
import {mainUrl} from '../config/mainUrl';
//Core
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

//Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//**Component
import UploadImageList from './UploadImageList';    //  각 Module별 이미지 리스트 View Component
import EditorTextField from './EditorTextField';    //  Editor의 View Component 텍스트 에디터는 모든 모듈이 공유.
import FileUpload from './FileUpload';

// Container Style Part
const Container = styled.div`

`;

const HeaderContainer = styled.div`

`;

const BodyContainer = styled.div`
    
`;

const FooterContainer = styled.div`
    
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
    margin-bottom:20px;
    padding:15px;
`;

const FooterWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
    margin-top:8px;
    margin-bottom:20px;
    padding:15px;
`;

const TextFieldWrapper = styled.div`
    padding:8px;
    // border-radius:15px;
    // margin: 8px 0;
    // border:1px solid #f1f1f1;

    .fieldActive{
        // border: 1px solid red !important;
        animation-duration: 3s;
        animation-name: slidein;
    }

    @keyframes slidein {
        // from {
        //     border: 2px solid #95a0da;
        // }
        // to {
        //     border: 2px solid #f1f1f1;
        // }
        0%{
            border: 2px solid #95a0da;
        }
        20%{
            border: 2px solid #f1f1f1;
        }
        40%{
            border: 2px solid #95a0da;
        }
        60%{
            border: 2px solid #f1f1f1;
        }
        80%{
            border: 2px solid #95a0da;
        }
        100%{
            border: 2px solid #f1f1f1;
        }
      }
`

const EditorWrapper = styled.div`
    border : 1px dotted #c4c4c4;
    border-radius:15px;
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
    border-radius: 15px;
    border:1px solid #f1f1f1;
    padding: 8px;
    margin: 8px;
`

const AddModulerButtonBox = styled.div`
    text-align:center;
    margin:8px 0;
    padding 8px;
`;

const UploadImageBox = styled.div`

    border:1px solid #f1f1f1;
    border-radius:15px;
    padding: 8px;
    margin:8px;
    
    .uploadedImage{
        width:88px;
        height:88px;
        border:1px solid #f1f1f1;
        border-radius:15px;
        margin:2px;
        object-fit:cover;
    }

    .uploadedImage:hover{
        border:1px solid blue;
    }
`

const TextFieldBox = styled.div`
    cursor: pointer;
    padding:15px;

    border-radius:15px;
    margin: 8px 0;
    border:1px solid #f1f1f1;

    :hover{
        border:2px solid #42baf3;
    }

    
`

const PreviewButtonBox = styled.div`
    float:right;
    margin-right: 8px;
`;

const SubmitButtonBox = styled.div`
    float:right;

`;
// Element Style Part
const TitleInput = styled(TextField)`

`;

const AddModulerButton = styled(IconButton)`
    border:1px solid #f1f1f1 !important;
    margin:0 4px !important;
`;

const PreviewButton = styled(Button)`
    
    font-size:15px !important;
    background:#a0a0a0 !important;
`;
const SubmitButton = styled(Button)`
    font-size:15px !important;
`;

const EditorBody = (props) => {
    const {
        userNickname,
        selectedModule,
        pathData,
        postTitle,
        postModule,
        editorDialOpen,
        commonFiles,
    } = props;

    const {
        handlePostTitleChange,
        addPostModule,
        deletePostModule,

        //image
        handleUploadImage,
        onImageUpload,
        handleImageDetailDialOpen,
        handleImageArrayRearrangeDialOpen,
        handleImageSliderFormSet,

        //editor
        _handleEditorDialOpen,
        _handleEditorDialUpdate,
        _handleEditorDialClose,
        _handlePostPreviewDialOpen,
        _handleSubmitOnClick,

        //commonFile
        handleFileUploaded,
        handleFileDeleteIndex,

        editorChange
    } = props;

    return (
        <Container>
            {console.log(postModule)}
            {console.log('selected : ', selectedModule)}

            {/* 
                **  Header Part
            */}
            <HeaderContainer className='container'>
                <HeaderWrapper>
                    <InformationBox>
                        
                        {/* <div>
                            작성지 : {pathData ? 
                                process.env.NODE_ENV==='production'?
                                    <span>
                                        <a href='http://www.shbom.com' className='text-dark'>홈</a>
                                        >
                                        <a href={`http://www.shbom.com/${pathData.pagePath}`} className='text-success'>{pathData.shbName}</a>
                                        >
                                        <a href={`http://www.shbom.com/${pathData.boardCategoryPath}`} className='text-primary'>{pathData.shbItemName}</a>
                                    </span>
                                    :
                                    <span>
                                        <a href='http://localhost:3000' className='text-dark'>홈</a>
                                        >
                                        <a href={`http://localhost:3000/${pathData.pagePath}`} className='text-success'>{pathData.shbName}</a>
                                        >
                                        <a href={`http://localhost:3000/${pathData.boardCategoryPath}`} className='text-primary'>{pathData.shbItemName}</a>
                                    </span>
                                :''}
                        </div> */}
                        <div>
                            작성지 : {pathData ? 
                                    <span>
                                        <a href={mainUrl} className='text-dark'>홈</a>
                                        >
                                        <a href={`${mainUrl}/${pathData.pagePath}`} className='text-success'>{pathData.shbName}</a>
                                        >
                                        <a href={`${mainUrl}/${pathData.boardCategoryPath}`} className='text-primary'>{pathData.shbItemName}</a>
                                    </span>
                                :''}
                        </div>
                        <div>
                            글쓴이 : {userNickname ? userNickname : ''}
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
                            value={postTitle}
                            onChange={handlePostTitleChange}
                            required
                        />
                    </TitleBox>
                    <FileUpload
                        commonFiles = {commonFiles}
                        handleFileUploaded = {handleFileUploaded}
                        handleFileDeleteIndex = {handleFileDeleteIndex}
                    />
                </HeaderWrapper>
            </HeaderContainer>
            {/* 
                **  Body Part
            */}


            <BodyContainer className='container'>
                <BodyWrapper>
                    <AddModulerButtonBox>
                        <AddModulerButton
                            type='button'
                            onClick={() => addPostModule('head')}
                        >
                            <AddIcon />
                        </AddModulerButton>
                    </AddModulerButtonBox>
                    {postModule && postModule.map((post, index) => {
                        return (
                            <EditorWrapper>

                                <EditorBox>
                                    <span className='text-primary'>{index + 1} </span>
                                    <span className='text-success'>Module number : {post.id}</span>
                                </EditorBox>
                                <UploadImageBox className='clearfix'>
                                    <Button type='button' color='primary' variant='outlined' onClick={() => handleImageArrayRearrangeDialOpen(post)}>
                                        순서 조정
                                    </Button>
                                    <FormControlLabel
                                        className='float-right'
                                        control={
                                            <Switch
                                                checked={post.imageSliderOn}
                                                onChange={()=>handleImageSliderFormSet(post)}
                                                value={post.imageSliderOn}
                                                color="primary"
                                            />
                                        }
                                        label="슬라이더 형식"
                                    />
                                    <UploadImageList
                                        moduleId={post.id}
                                        imageList={post.imageList}

                                        handleUploadImage={handleUploadImage}
                                        onImageUpload={onImageUpload}
                                        handleImageDetailDialOpen={handleImageDetailDialOpen}
                                    />
                                </UploadImageBox>
                                <TextFieldWrapper>
                                    <TextFieldBox
                                        id={post.id}
                                        key={post.id}
                                        className="editor"
                                        onClick={() => _handleEditorDialOpen(post)}
                                    >
                                        {post.editorData ?
                                            <div className='ck-content' dangerouslySetInnerHTML={{ __html: post.editorData }}>
                                            </div>
                                            :
                                            <div className='text-center text-primary'>클릭하여 텍스트 작성</div>
                                        }
                                    </TextFieldBox>
                                </TextFieldWrapper>
                                <AddModulerButtonBox>
                                    <AddModulerButton
                                        type='button'
                                        onClick={() => addPostModule(post.id)}
                                    >
                                        <AddIcon />
                                    </AddModulerButton>
                                    <AddModulerButton
                                        type='button'
                                        onClick={() => deletePostModule(post.id)}
                                    >
                                        <DeleteIcon />
                                    </AddModulerButton>
                                </AddModulerButtonBox>
                            </EditorWrapper>
                        );
                    })}
                </BodyWrapper>
            </BodyContainer>
            <div id='TextEditorFieldFocus'>
                {editorDialOpen && selectedModule ?
                    <EditorTextField
                        selectedIndexData={selectedModule}
                        editorDialOpen={editorDialOpen}

                        _handleEditorDialOpen={_handleEditorDialOpen}
                        _handleEditorDialUpdate={_handleEditorDialUpdate}
                        _handleEditorDialClose={_handleEditorDialClose}
                    />
                    :
                    ''
                }
            </div>

            {/* 
                **  Footer Part
            */}
            <FooterContainer className='container'>
                <FooterWrapper className='clearfix'>
                    {editorDialOpen ?
                        <div>
                            현재 에디터를 작성중입니다...
                        </div>
                        :
                        <div>
                            <SubmitButtonBox>
                                {postTitle === '' || postTitle === null || postTitle === undefined ?
                                    <SubmitButton type='button' variant="contained" color='primary' disabled>주제는 필수입력 입니다.</SubmitButton>
                                    :
                                    <SubmitButton
                                        type='button'
                                        variant="contained"
                                        color='primary'
                                        onClick={_handleSubmitOnClick}
                                    >
                                        포스팅하기
                                    </SubmitButton>
                                }

                            </SubmitButtonBox>
                            <PreviewButtonBox>
                                <PreviewButton type='button' variant="contained" color='primary' onClick={_handlePostPreviewDialOpen}>미리보기</PreviewButton>
                            </PreviewButtonBox>
                        </div>
                    }

                </FooterWrapper>
            </FooterContainer>
        </Container>
    );
}

export default EditorBody;