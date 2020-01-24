import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//draftjs
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

//Component
import EditorTextField from './EditorTextField';

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

export default function MaxWidthDialog(props) {
    const classes = useStyles();
    const { 
        editorDialOpen,
        selectedIndexData
    } = props;

    const {
        _handleEditorDialClose,
        _handleSaveEditorState,
    } = props;
    
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');

    //Draft
    const [currentEditorState, setCurrentEditorState] = useState(null);

    useEffect(() => {
        initEditorState();
    },[])

    const initEditorState = () =>{
        console.log(selectedIndexData)
        setCurrentEditorState(selectedIndexData.editorState)
    }
    const _handleEditorStateChange = (editorState) => {
        setCurrentEditorState(editorState);
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={editorDialOpen}
                onClose={()=>_handleEditorDialClose(currentEditorState)}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{selectedIndexData && selectedIndexData.id}의 텍스트 작성</DialogTitle>
                <DialogContent>
                    {currentEditorState?
                        <EditorTextField
                            selectedIndexData = {selectedIndexData}
                            editorState={currentEditorState}

                            _handleSaveEditorState = {_handleSaveEditorState}
                            _handleEditorStateChange= {_handleEditorStateChange}
                        />:
                        ''
                    }
                    
                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={()=>_handleEditorDialClose(currentEditorState)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}