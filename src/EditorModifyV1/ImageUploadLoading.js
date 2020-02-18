import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '@material-ui/core/CircularProgress';

const ImageUploadLoading = (props) => {

  const {
    imageUploadLoading,
    uploadPercentage
  } = props;
    return (
      <div>
        <Dialog
          open={imageUploadLoading}
          //   onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"업로드 중입니다. 잠시만 기다려주세요."}</DialogTitle>
          <DialogContent className='text-center'>
            <Progress />
            <div>
              {`${uploadPercentage}%`}
            </div>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default (ImageUploadLoading);