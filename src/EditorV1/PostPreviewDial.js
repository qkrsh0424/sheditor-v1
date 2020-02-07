import React, { useState, useEffect } from 'react';

//styled-component
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Component
import ImageSliderForm from './ImageSliderForm';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

const Container = styled.div`
    // border: 1px solid gray;
`;

// Elements 
const FigureEl = styled.figure`
    // text-align:right;
`;

const ImageEl = styled.img`
    // width: 50%;
`;

const DialogTitleEl = styled.div`
    margin:16px 0;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 20px;
    font-weight:700;
`;

export default function PostPreviewDial(props) {

    //**  Props get  */ 
    //* state
    const {
        postPreviewDialOpen,
        postTitle,
        postModule
    } = props;
    //* controller
    const {
        _handlePostPreviewDialClose,
    } = props;


    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xl');


    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={postPreviewDialOpen}
                onClose={_handlePostPreviewDialClose}
                aria-labelledby="max-width-dialog-title"
            >
                <Container
                    className='container'
                >
                    <DialogTitleEl
                        id="max-width-dialog-title"
                        className={window.innerWidth <= '900' ? '' : ''}
                    >
                        주제 : {postTitle}
                    </DialogTitleEl>
                    <hr/>
                    <div>
                        {postModule ?
                            postModule.map(moduler => {
                                if (moduler.imageSliderOn) {
                                    return (
                                        <div>
                                            {moduler.imageList[0] && 
                                                <ImageSliderForm
                                                    imageList = {moduler.imageList}
                                                />
                                            }
                                            <div className='ck-content' dangerouslySetInnerHTML={{ __html: moduler.editorData }}>
                                            </div>
                                        </div>

                                    );
                                } else {
                                    return (
                                        <div>
                                            {moduler.imageList ?
                                                moduler.imageList.map(image => {
                                                    return (
                                                        <FigureEl className={`text-${image.align}`}>
                                                            <ImageEl
                                                                src={image.imgUrl}
                                                                width={image.imgSize}
                                                            ></ImageEl>
                                                        </FigureEl>
                                                    );

                                                })
                                                :
                                                'image loading...'
                                            }
                                            <div className='ck-content' dangerouslySetInnerHTML={{ __html: moduler.editorData }}>
                                            </div>
                                        </div>
                                    );
                                }

                            })
                            :
                            'loading...'
                        }

                    </div>
                    <DialogActions>

                        <Button
                            type='button'
                            onClick={_handlePostPreviewDialClose}
                            color="primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Container>
            </Dialog>
        </React.Fragment>
    );
}