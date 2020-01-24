import React,{useState, useEffect} from 'react';

//uuid
import uuidv1 from 'uuid/v1';
import uuidv4 from 'uuid/v4';

//API
import * as editorApi from './EditorAPI';

//Component
import EditorBody from './EditorBody';
import EditorTextFieldDial from './EditorTextFieldDial';
import { EditorState } from 'draft-js';



const EditorMain = (props) =>{
    const {
        imageUploadApi
    } = props;

    const [postModule, setPostModule] = useState([
        {
            id:uuidv1(),
            editorState:EditorState.createEmpty(),
            imageList:[]
        }
    ]);

    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [editorDialOpen,setEditorDialOpen] = useState(false);


    useEffect(()=>{

    },[]);

    const addPostModule = (positionType) =>{
        const originVal = [...postModule];
        const itemData = [
            {
                id:uuidv1(),
                editorState:EditorState.createEmpty(),
                imageList:[]
            }
        ]
        let newVal = null;

        if(positionType==='head'){
            newVal = itemData.concat(originVal);
        }else{
            let fData = originVal.slice(0,_findPostModuleIndex(positionType)+1);
            let bData = originVal.slice(_findPostModuleIndex(positionType)+1, originVal.length);

            newVal = (fData.concat(itemData)).concat(bData);
            // newVal = originVal.concat(itemData);
        }
        setPostModule(newVal);
    }

    const _findPostModuleIndex = (moduleId) =>{
        for(let i = 0 ; i < postModule.length; i++){
            if(postModule[i].id===moduleId){
                return i;
            }
        }
        return 0;
    }

    const deletePostModule = (moduleId) => {
        setPostModule(postModule.filter(data => data.id!== moduleId));
    }

    const handleUploadImage = async(moduleId,e) =>{
        e.preventDefault();
        console.log(moduleId);
        setSelectedModuleId(moduleId);
        document.getElementById('image-file-input').click();


    }
    const onImageUpload = async(e) =>{
        if (e.target.files.length !== 0) {
            setImageUploadLoading(true);
            let filesize = e.target.files.length;
            const formData = new FormData();

            for (let i = 0; i < filesize; i++) {
                let filedata = e.target.files[i];
                formData.append(`file`, filedata);
            }

            await editorApi.uploadImage2Oss(formData)
                .then(data => {
                    if (data.message === 'successOne') {
                        onAddImage(data);
                        setImageUploadLoading(false);
                        // console.log(postModule);
                    } else if (data.message === 'successMultiple') {
                        onAddImage(data);
                        setImageUploadLoading(false);
                        
                    } else if (data.message === 'failure') {
                        setImageUploadLoading(false);
                        alert('서버가 좋지 않습니다. code: (IU:1)');
                    } else {
                        setImageUploadLoading(false);
                        alert('예상치 못한 오류가 발생했습니다. code: (IU:2)');
                    }
                    
                }).catch(err => {
                    setImageUploadLoading(false);
                    alert('연결 시간이 초과 되었습니다. 네트워크를 다시 확인해 주십시오.');
                })
        }
    }

    const onAddImage = async(imgUrl) =>{
        document.getElementById('image-file-input').value = '';
        const originData = [...postModule];
        const imgData = [];
        const newImageListArr = [];

        if (imgUrl.message === 'successOne') {
            imgData.push({ imgId: uuidv4(), imgUrl: imgUrl.url })
        } else {
            for (let i = 0; i < imgUrl.url.length; i++) {
                imgData.push({ imgId: uuidv4(), imgUrl: imgUrl.url[i] })
            }
        }

        
        for(let i = 0 ; i < originData.length ; i++){
            if(originData[i].id===selectedModuleId){
                newImageListArr.push(...imgData);
                // setPostModule(data=>[
                //     ...data,
                // ],postModule[i].imageList.push(...newImageListArr));
                setPostModule([...postModule],postModule[i].imageList.push(...newImageListArr))
            }
        }
    }
    const handleDeleteImage = () =>{

    }



    //TextEditor classify
    const _handleEditorDialOpen = async(indexData) =>{
        console.log(indexData);
        setEditorDialOpen(true);
        setSelectedModule(indexData);
    }

    const _handleEditorDialClose = async(editorData) =>{
        editorChange(selectedModule, editorData);
        await setTimeout(()=>{
            setEditorDialOpen(false);
            setSelectedModule(null);
        },0);
        
    }

    const _handleSaveEditorState = async() =>{

    }

    const editorChange = async (indexData,editorStateRec) =>{
        const index = _findPostModuleIndex(indexData.id);
        setPostModule([...postModule], postModule[index].editorState = editorStateRec);
        
    }

    return(
        <>
            <EditorBody
                postModule={postModule}

                addPostModule = {addPostModule}
                deletePostModule = {deletePostModule}
                handleUploadImage = {handleUploadImage}
                onImageUpload = {onImageUpload}
                handleDeleteImage = {handleDeleteImage}
                _handleEditorDialOpen = {_handleEditorDialOpen}
            />
            
            {selectedModule && 
                <EditorTextFieldDial
                    editorDialOpen={editorDialOpen}
                    selectedIndexData = {selectedModule}

                    _handleEditorDialClose={_handleEditorDialClose}
                    _handleSaveEditorState={_handleSaveEditorState}
                />
            }
            
        </>
    );
}

export default EditorMain;