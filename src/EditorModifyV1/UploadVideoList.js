import React, { useEffect } from 'react';
import styled from 'styled-components';

//Core
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

//Icons
// import AddBoxIcon from '@material-ui/icons/AddBoxOutlined';
import AddBoxIcon from '@material-ui/icons/AddAPhotoOutlined';
import VideoCallIcon from '@material-ui/icons/VideoCallOutlined';

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
        videoData
    } = props;

    const {
        handleUploadVideo,
        onVideoUpload,
        handleUploadThumbnail,
        onThumbnailUpload,
        handleDeleteVideo,
        handleImageDetailDialOpen
    } = props;
    return (
        <ImageListBox>
            {videoData ? 
                <div className='clearfix'>
                    <input
                        type='file'
                        name='file'
                        id='thumbnail-file-input'
                        className='btn btn-secondary'
                        onChange={onThumbnailUpload}
                        hidden
                        accept="image/*"
                    />
                    <video 
                        id="videoPlayer" 
                        className='float-left'
                        controls
                        autoplay={false}
                        width='200px'
                        height='150px'
                        poster={videoData.videoThumbnail?videoData.videoThumbnail:`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`}
                        controlsList="nodownload"
                    >
                        {/* <source src={`${serverUrl}/api/service/extend/video`} type="video/mp4"/> */}
                        <source src={`${videoData.videoUrl}`} type={videoData.type}/>
                    </video>
                    <Button 
                        color='primary' 
                        variant='outlined' 
                        className='float-left m-1'
                        onClick={(e) => handleUploadThumbnail(moduleId,e)}
                    >썸네일</Button>
                    <Button 
                        color='secondary' 
                        variant='outlined' 
                        className='float-left m-1'
                        onClick={(e) => handleDeleteVideo(moduleId,e)}
                    >삭제</Button>
                    
                </div>
                
                :
                <div>
                    <input
                        type='file'
                        name='file'
                        id='video-file-input'
                        className='btn btn-secondary'
                        onChange={onVideoUpload}
                        hidden
                        // multiple
                        accept="video/*"
                    />
                    <UploadButton type='button' onClick={(e) => handleUploadVideo(moduleId,e)}><VideoCallIcon style={{color:'#878787', fontSize:'50px'}}/></UploadButton>
                    <div className='text-danger' style={{fontSize:'10px'}}>*100MB 미만의 영상만 업로드 가능합니다.</div>
                </div>
                
            }
            
        </ImageListBox>
    );
}