import React, { useEffect } from 'react';
import styled from 'styled-components';

//Core
import Tooltip from '@material-ui/core/Tooltip';

//Icons
// import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import AddBoxIcon from '@material-ui/icons/AddAPhotoOutlined';

const ImageListBox = styled.div`

`;
const ImageListContainer = styled.div`
    border:1px solid black;
    min-height:100px;
    height:auto;
    width:auto;
    overflow-x:scroll;
    padding:3px;
`;

const UploadButton = styled.button`
    height:100px;
    width:100px;
    background:none;
    margin:8px 0;
    position: relative;
    border-radius:15px;
    border: 1px solid #d0d0d0;

    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;

    :hover{
        background:#f0f0f0;
        border:none;
    }

    :after {
        content: "";
        background: #d0d0d0;
        display: block;
        position: absolute;
        padding-top: 300%;
        padding-left: 350%;
        margin-left: -20px!important;
        margin-top: -120%;
        opacity: 0;
        transition: all 0.8s
      }
      :active:after {
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s
      }
`;
export default function UploadImageList(props) {
    const {
        moduleId,
        imageList
    } = props;

    const {
        handleUploadImage,
        onImageUpload,
        handleDeleteImage
    } = props;
    return (
        <ImageListBox>
            <input
                type='file'
                name='file'
                id='image-file-input'
                className='btn btn-secondary'
                onChange={onImageUpload}
                hidden
                multiple
                accept="image/*"
            />
            {imageList && imageList.map((image, index) => {
                return (
                    <img
                        src={image.imgUrl}
                        className='uploadedImage'
                        onClick={() => handleDeleteImage(image.id)}
                        title={image.imgId}
                    ></img>

                );
            })}

            <UploadButton type='button' onClick={(e) => handleUploadImage(moduleId,e)}><AddBoxIcon style={{color:'#878787', fontSize:'50px'}}/></UploadButton>
        </ImageListBox>
    );
}