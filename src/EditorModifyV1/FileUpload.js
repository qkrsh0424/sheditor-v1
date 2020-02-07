import React from 'react';
import styled from 'styled-components';
//Core
import Button from '@material-ui/core/Button';


const FileUploadButton = styled(Button)`
`;
const UploadListBox = styled.div`
    border:1px solid #afafaf;
    padding:5px;
`;



export default function FileUploadPart(props){
    //state
    const {
        commonFiles,
    } = props;

    //controller
    const {
        handleFileUploaded,
        handleFileDeleteIndex
    } = props;

    const _fileUploadButtonClick = (e) =>{
        e.preventDefault();
        document.getElementById('commonfile').click();
    }

    return(
        <div>
            <input 
                type='file'
                name='commonfile'
                id='commonfile'
                className='btn btn-secondary'
                onChange={handleFileUploaded}
                hidden
                multiple
            />
            <FileUploadButton 
                className='mb-2'
                type='button'
                onClick={_fileUploadButtonClick}
                // color='primary'
                variant='outlined'
            >
                파일 업로드
            </FileUploadButton>
            {commonFiles && commonFiles[0] && 
                <UploadListBox>
                        {commonFiles.map((rows,index)=>{
                            return(
                                <div className='clearfix p-2'>
                                    <a href={rows.url}
                                        target='_blank'
                                        download
                                    >{rows.name}</a>
                                    <span> | </span>
                                    <button type='button' className='btn btn-sm btn-danger' onClick={()=>handleFileDeleteIndex(rows)}>삭제</button>
                                </div>
                            );
                        })}
                </UploadListBox>
            }
            
        </div>
    );
}