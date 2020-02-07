import React, { useState, useEffect } from 'react';
//styled components
import styled from 'styled-components';

//Core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//react-sortable-hoc
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

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

const ContentBox = styled.div`
    padding:15px;
    margin:8px 50px;
    border: 1px solid #f1f1f1;
    border-radius: 15px;

`;
const DialogContentCustom = styled(DialogContent)`
    padding:15px;
`;

const ImageArrayListUl = styled.ol`
`;

const ImageEl = styled.img`
    // object-fit:scale-down;
    object-fit:cover;
    width:88px; 
    height:88px;
    background:#f1f1f1;
    border:1px solid #f1f1f1;
    border-radius:15px;
`;
export default function ImageArrayRearrangeDial(props) {
    //state
    const {
        imageArrayRearrangeDialOpen,
        selectedModule
    } = props;

    //controller
    const {
        handleImageArrayRearrangeDialClose
    } = props;
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [imageArrayList, setImageArrayList] = useState(selectedModule.imageList);

    const SortableItem = SortableElement(({ value }) =>
        <li>
            <ImageEl src={value.imgUrl}/>
        </li>
    );

    const SortableList = SortableContainer(({ items }) => {
        return (
            <ImageArrayListUl>
                {items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value} />
                ))}
            </ImageArrayListUl>
        );
    });

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setImageArrayList(arrayMove(imageArrayList, oldIndex, newIndex));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={imageArrayRearrangeDialOpen}
                onClose={() => handleImageArrayRearrangeDialClose(selectedModule, imageArrayList)}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title" className='text-center'>이미지 순서 재조정</DialogTitle>
                <DialogContentCustom>
                    {/* {imageArrayList && imageArrayList.map(row => {
                        return (
                            <img src={row.imgUrl} width='88px' height='88px' />
                        );
                    })} */}
                    <ContentBox className='text-center'>
                        {imageArrayList &&
                            <SortableList items={imageArrayList} onSortEnd={onSortEnd} />
                        }
                    </ContentBox>

                </DialogContentCustom>
                <DialogActions>

                    <Button
                        color="primary"
                        onClick={() => handleImageArrayRearrangeDialClose(selectedModule, imageArrayList)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}