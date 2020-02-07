import React, { useState, useEffect } from 'react';
//styled components
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

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

const ButtonGroup = styled.div`
    padding:8px;
    margin:8px;
`;
export default function PostSubmitDial(props) {
    //state
    const {
        submitCheckDialOpen
    } = props;

    //controller
    const {
        _handleSubmitDialClose,
        _handleSubmitAgree
    } = props;

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={submitCheckDialOpen}
                onClose={_handleSubmitDialClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title" className='text-center'>정말로 포스팅 하시겠습니까?</DialogTitle>
                {/* <DialogContentCustom>
                    
                </DialogContentCustom> */}
                
                <ButtonGroup className='text-center'>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button
                                color="primary"
                                variant="outlined"
                                size="large"
                                onClick={_handleSubmitAgree}
                            >
                                Agree
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="large"
                                onClick={_handleSubmitDialClose}
                            >
                                Cancel
                            </Button> 
                        </Grid>
                    </Grid>
                </ButtonGroup>
            </Dialog>
        </React.Fragment>
    );
}