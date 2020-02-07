import React, { useState, useEffect } from 'react';
//styled components
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const ImageFigureBox = styled.figure`

`;
const ImageSizeSelectBox = styled.div`
    margin: 8px;
    padding: 8px;
`;

const ImageAlignSelectBox = styled.div`
    margin: 8px;
    padding: 8px;
`;

const DialogContentCustom = styled(DialogContent)`
    padding:15px;
`;
export default function ImageDetail(props) {

    //state
    const {
        imageDetailDialOpen,
        selectedImage
    } = props;

    //controller
    const {
        handleImageDetailDialClose,
        handleImageDelete
    } = props;

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [currentSize, setCurrentSize] = useState(selectedImage.imageData.imgSize);
    const [currentAlign, setCurrentAlign] = useState(selectedImage.imageData.align);

    const handleImageSizeSet = (e) => {
        setCurrentSize(e.target.value);
    }

    const handleImageAlignSet = (e) => {
        setCurrentAlign(e.target.value);
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={imageDetailDialOpen}
                onClose={()=>handleImageDetailDialClose(selectedImage, currentSize, currentAlign)}
                aria-labelledby="max-width-dialog-title"
            >
                {/* <DialogTitle id="max-width-dialog-title">의 텍스트 작성</DialogTitle> */}
                <DialogContentCustom>
                    <ImageFigureBox className={`text-${currentAlign}`}>
                        <img
                            src={selectedImage.imageData.imgUrl}
                            width={currentSize}
                        />
                    </ImageFigureBox>
                    <ImageSizeSelectBox>
                        <label>이미지 사이즈</label>
                        <Select
                            value={currentSize}
                            onChange={handleImageSizeSet}
                            fullWidth
                        >
                            <MenuItem value={'100%'}>크게</MenuItem>
                            <MenuItem value={'75%'}>중간</MenuItem>
                            <MenuItem value={'50%'}>작게</MenuItem>
                        </Select>
                    </ImageSizeSelectBox>
                    <ImageAlignSelectBox>
                        <label>이미지 위치</label>
                        <Select
                            value={currentAlign}
                            onChange={handleImageAlignSet}
                            fullWidth
                        >
                            <MenuItem value={'justify'}>기본</MenuItem>
                            <MenuItem value={'left'}>왼쪽</MenuItem>
                            <MenuItem value={'center'}>중간</MenuItem>
                            <MenuItem value={'right'}>오른쪽</MenuItem>
                        </Select>
                    </ImageAlignSelectBox>
                </DialogContentCustom>
                <DialogActions>
                    <Button 
                        color='secondary'
                        onClick={()=>handleImageDelete(selectedImage)}
                    >
                        삭제하기
                    </Button>
                    <Button
                        color="primary"
                        onClick={()=>handleImageDetailDialClose(selectedImage, currentSize, currentAlign)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}