import React, { useState, useEffect, lazy } from 'react';
//URL
import {mainUrl} from '../config/mainUrl';
//uuid
import uuidv1 from 'uuid/v1';
import uuidv4 from 'uuid/v4';

//API
import * as editorApi from './EditorAPI';

//Core
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//**Component
// import EditorBody from './EditorBody';

// import PostPreviewDial from './PostPreviewDial';
// import PostSubmitDial from './PostSubmitDial';

//*Image
// import ImageDetailDial from './ImageDetailDial';
// import ImageUploadLoading from './ImageUploadLoading';
// import ImageArrayRearrangeDial from './ImageArrayRearrangeDial';

const EditorBody = lazy(()=>import('./EditorBody'));
const PostPreviewDial = lazy(()=>import('./PostPreviewDial'));
const PostSubmitDial = lazy(()=>import('./PostSubmitDial'));
const ImageDetailDial = lazy(()=>import('./ImageDetailDial'));
const ImageUploadLoading = lazy(()=>import('./ImageUploadLoading'));
const ImageArrayRearrangeDial = lazy(()=>import('./ImageArrayRearrangeDial'));


const EditorMain = (props) => {
    const {
        cookiesUSID,
        userNickname,
        queryValues,
        imageUploadApi
    } = props;

    

    const [postModule, setPostModule] = useState([
        {
            id: uuidv1(),
            editor: null,
            editorData: '',
            imageList: [],
            imageSliderOn:false,
            videoData:null
            // videoData:{
            //     videoId:uuidv4(),
            //     videoUrl:`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/videoFiles/1584279548534media1.mp4`,
            //     type:'video/mp4',
            //     videoThumbnail:null
            // }
        }
    ]);

    const [pathData, setPathData] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [editorDialOpen, setEditorDialOpen] = useState(false);

    //post preview 관련 state
    const [postPreviewDialOpen, setPostPreviewDialOpen] = useState(false);

    //image 관련 state
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageDetailDialOpen, setImageDetailDialOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);   // @params {moduleId, imageData}
    const [imageArrayRearrangeDialOpen, setImageArrayRearrangeDialOpen] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    //submit 관련 state
    const [submitErrorSnackbarOpen, setSubmitErrorSnackbarOpen] = useState(false);
    const [submitCheckDialOpen, setSubmitCheckDialOpen] = useState(false);

    //commonFile 관련 state
    const [commonFiles,setCommonFiles] = useState([]);

    

    useEffect(() => {
        getPath();
    }, []);

    // ** load write path*/
    const getPath = () =>{
        editorApi.getInformationPath(queryValues.BomNo, queryValues.Category)
        .then(data=>{
            // console.log(data);
            if(data.message==='success'){
                let shbNum = data.data.shb_num;
                let shbName = data.data.shb_name;
                let shbItemId = data.data.shb_item_id;
                let shbItemName = data.data.shb_item_name;
                let parentRoute = data.data.parent_route;

                let pagePath;
                let boardCategoryPath;
                if(data.data.shb_num===1101001){
                    shbName='메인 게시판';
                    pagePath = `contentsList`;
                    boardCategoryPath = `${data.data.parent_route}/category/${shbItemId}?BomNo=${shbNum}`;
                }
                if(data.data.shb_num!==1101001){
                    pagePath=`classify/${data.data.parent_route}/contype/${shbNum}`
                    boardCategoryPath = `classify/${data.data.parent_route}/category/${shbItemId}?BomNo=${shbNum}`;

                }
                setPathData({
                    shbNum:shbNum,
                    shbName:shbName,
                    shbItemId:shbItemId,
                    shbItemName:shbItemName,
                    parentRoute:parentRoute,
                    pagePath,
                    boardCategoryPath
                });
            }
        })        
    }

    //** post title 관련 컨트롤러 */
    const handlePostTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    const addPostModule = (positionType) => {
        const originVal = [...postModule];
        const itemData = [
            {
                id: uuidv1(),
                editor: null,
                editorData: '',
                imageList: [],
                imageSliderOn:false,
                videoData:null
            }
        ]
        let newVal = null;
        let moduleNum = itemData.id;

        if (positionType === 'head') {
            newVal = itemData.concat(originVal);
        } else {
            let fData = originVal.slice(0, _findPostModuleIndex(positionType) + 1);
            let bData = originVal.slice(_findPostModuleIndex(positionType) + 1, originVal.length);

            newVal = (fData.concat(itemData)).concat(bData);
            // newVal = originVal.concat(itemData);
        }
        setPostModule(newVal);
    }

    const _findPostModuleIndex = (moduleId) => {
        for (let i = 0; i < postModule.length; i++) {
            if (postModule[i].id === moduleId) {
                return i;
            }
        }
        return 0;
    }

    const deletePostModule = (moduleId) => {
        setPostModule(postModule.filter(data => data.id !== moduleId));
    }

    // video 관련
    const handleUploadVideo = async (moduleId, e) =>{
        e.preventDefault();
        // console.log(moduleId);
        setSelectedModuleId(moduleId);
        document.getElementById('video-file-input').click();
    }

    const onVideoUpload = async (e)=>{
        if (e.target.files.length !== 0) {
            setImageUploadLoading(true);
            let filesize = e.target.files.length;
            const formData = new FormData();

            for (let i = 0; i < filesize; i++) {
                let filedata = e.target.files[i];
                formData.append(`file`, filedata);
            }
            await editorApi.uploadVideo2Oss(formData, handleSetUploadPercentage)
            .then(data => {
                console.log(data);
                if (data.message === 'success') {
                    onAddVideo(data);
                    setImageUploadLoading(false);
                    // console.log(postModule);
                } else if (data.message === 'successMultiple') {
                    onAddVideo(data);
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
    

    const onAddVideo = async(data)=>{
        document.getElementById('video-file-input').value = '';
        const originData = [...postModule];
        const videoData = [];

        videoData.push({videoId:uuidv1(), videoUrl:data.url, type:data.type});

        for (let i = 0; i < originData.length; i++) {
            if (originData[i].id === selectedModuleId) {
                setPostModule(
                    [...postModule], 
                    postModule[i].videoData=videoData[0]
                );
            }
        }
    }

    const handleDeleteVideo = async(moduleId, e)=>{
        console.log(moduleId)
        const originData = [...postModule];
        for (let i = 0; i < originData.length; i++) {
            if (originData[i].id === moduleId) {
                setPostModule(
                    [...postModule], 
                    postModule[i].videoData=null
                );
            }
        }
    }

    const handleUploadThumbnail = async (moduleId, e) =>{
        e.preventDefault();
        // console.log(moduleId);
        setSelectedModuleId(moduleId);
        document.getElementById('thumbnail-file-input').click();
    }

    const onThumbnailUpload = async(e)=>{
        if (e.target.files.length !== 0) {
            setImageUploadLoading(true);
            let filesize = e.target.files.length;
            const formData = new FormData();

            for (let i = 0; i < filesize; i++) {
                let filedata = e.target.files[i];
                formData.append(`file`, filedata);
            }
            await editorApi.uploadVideoThumbnail2Oss(formData, handleSetUploadPercentage)
            .then(data => {
                console.log(data);
                if (data.message === 'success') {
                    onAddThumbnail(data);
                    setImageUploadLoading(false);
                    // console.log(postModule);
                } else if (data.message === 'successMultiple') {
                    onAddThumbnail(data);
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

    const onAddThumbnail = async(data)=>{
        document.getElementById('thumbnail-file-input').value = '';
        const originData = [...postModule];

        for (let i = 0; i < originData.length; i++) {
            if (originData[i].id === selectedModuleId) {
                setPostModule(
                    [...postModule], 
                    postModule[i].videoData={
                        ...postModule[i].videoData,
                        videoThumbnail:data.url
                    }
                );
            }
        }
    }

    // image 관련
    const handleUploadImage = async (moduleId, e) => {
        e.preventDefault();
        // console.log(moduleId);
        setSelectedModuleId(moduleId);
        document.getElementById('image-file-input').click();


    }
    const onImageUpload = async (e) => {
        if (e.target.files.length !== 0) {
            setImageUploadLoading(true);
            let filesize = e.target.files.length;
            const formData = new FormData();

            for (let i = 0; i < filesize; i++) {
                let filedata = e.target.files[i];
                formData.append(`file`, filedata);
            }
            await editorApi.uploadImage2Oss(formData, handleSetUploadPercentage)
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

    const onAddImage = async (imgUrl) => {
        document.getElementById('image-file-input').value = '';
        const originData = [...postModule];
        const imgData = [];
        const newImageListArr = [];

        if (imgUrl.message === 'successOne') {
            imgData.push({
                imgId: uuidv4(),
                imgUrl: imgUrl.url,
                imgSize: '75%',
                align: 'center'
            })
        } else {
            for (let i = 0; i < imgUrl.url.length; i++) {
                imgData.push({
                    imgId: uuidv4(),
                    imgUrl: imgUrl.url[i],
                    imgSize: '75%',
                    align: 'center'
                })
            }
        }


        for (let i = 0; i < originData.length; i++) {
            if (originData[i].id === selectedModuleId) {
                newImageListArr.push(...imgData);
                // setPostModule(data=>[
                //     ...data,
                // ],postModule[i].imageList.push(...newImageListArr));
                setPostModule([...postModule], postModule[i].imageList.push(...newImageListArr))
            }
        }
    }

    const handleImageDetailDialOpen = (moduleId, imageData) => {
        // console.log(imageData);
        setImageDetailDialOpen(true);
        setSelectedImage({ moduleId: moduleId, imageData: imageData });
    }

    const handleImageDetailDialClose = (imageData, newSize, newAlign) => {
        // console.log(imageData, newSize, newAlign);
        const originImg = [

        ]
        setPostModule(
            postModule.map(row => {
                return (
                    row.id === imageData.moduleId ?
                        {
                            ...row,
                            imageList: row.imageList.map(image => {
                                return (
                                    image.imgId === imageData.imageData.imgId ?
                                        {
                                            ...image,
                                            imgSize: newSize,
                                            align: newAlign
                                        }
                                        : image //두번째 배열 검사
                                );
                            }
                            )
                        }
                        : row   //첫번째 배열 검사
                )
            }

            )
        )
        setImageDetailDialOpen(false);
        setSelectedImage(null);
    }

    const handleImageDelete = async (imageData) =>{
        await setPostModule(
            postModule.map(row=>{
                return(
                    row.id===imageData.moduleId?
                    {
                        ...row,
                        imageList:row.imageList.filter(index=>index.imgId!==imageData.imageData.imgId)
                    }
                    :
                    row
                )
            })
        )
        setImageDetailDialOpen(false);
        setSelectedImage(null);
    }
    //ImageArrayRearrange 관련
    const handleImageArrayRearrangeDialOpen = (indexData) =>{
        setSelectedModule(indexData);
        setImageArrayRearrangeDialOpen(true);
    }

    const handleImageArrayRearrangeDialClose = async(indexData, newImageArrayList) =>{
        await setPostModule(
            postModule.map(row=>{
                return(
                    row.id===indexData.id ? 
                        {
                            ...row,
                            imageList:newImageArrayList
                        }
                    : row
                )
            })
        );
        await setTimeout(()=>{
            setImageArrayRearrangeDialOpen(false);
            setSelectedModule(null);
        },100);
        
    }

    const handleImageSliderFormSet = (post) =>{
        setPostModule(
            postModule.map(row=>{
                return(
                    row.id===post.id ? 
                        {
                            ...row,
                            imageSliderOn:!post.imageSliderOn
                        }
                    :
                    row
                )
                
            })
        );
    }

    const handleSetUploadPercentage = (value) =>{
        setUploadPercentage(value);
    }

    //TextEditor classify
    const _handleEditorDialOpen = async (indexData) => {
        await setEditorDialOpen(true);
        await setSelectedModule(indexData);
        await setTimeout(() => _scrollMoveToComment(), 100)
    }

    const _scrollMoveToComment = async () => {
        document.getElementById('TextEditorFieldFocus').scrollIntoView({
            // behavior: 'smooth',
            block: "center"
        });

    }

    const _handleEditorDialUpdate = async (moduler, editor, editorData) => {
        const thisEl = document.getElementById(moduler.id);

        editorChange(moduler, editor, editorData);
        await setTimeout(() => {
            setEditorDialOpen(false);
            setSelectedModule(null);
        }, 0);
        thisEl.scrollIntoView({
            behavior: 'smooth',
            block: "center"
        });

        thisEl.classList.add('fieldActive');
        await setTimeout(() => {
            thisEl.classList.remove('fieldActive')
        }, 4000);

    }

    const _handleEditorDialClose = async (moduler) => {
        const thisEl = document.getElementById(moduler.id);

        await setTimeout(() => {
            setEditorDialOpen(false);
            setSelectedModule(null);
        }, 0);
        thisEl.scrollIntoView({
            behavior: 'smooth',
            block: "center"
        });
    }

    // submit 관련
    const _handleSubmitOnClick = () => {
        
        if (postModule[0] === undefined) {
            return setSubmitErrorSnackbarOpen(true);
        }

        setSubmitCheckDialOpen(true);
        
    }

    const _handleSubmitDialClose = () =>{
        setSubmitCheckDialOpen(false);
    }

    const _handleSubmitAgree = async() =>{
        // console.log('postTitle : ', postTitle);
        // console.log('module : ', postModule);
        // console.log('commonFiles : ', commonFiles);
        await editorApi._Authentication(cookiesUSID)
        .then(data=>{
            if (data.message === 'connect success') {
                editorApi.postWrtie2Server(cookiesUSID, postTitle, postModule, commonFiles, queryValues.BomNo, queryValues.Category, queryValues.Pr)
                .then(data=>{
                    // console.log(data);
                    if(data.message==='success'){
                        // process.env.NODE_ENV==='production' ? 
                        //     window.location.href=`http://www.shbom.com/postPage?BomNo=${data.postInfo.BomNo}&Category=${data.postInfo.Category}&Pr=${data.postInfo.Pr}&PostVal=${data.postInfo.postVal}`
                        //     :
                        //     window.location.href=`http://localhost:3000/postPage?BomNo=${data.postInfo.BomNo}&Category=${data.postInfo.Category}&Pr=${data.postInfo.Pr}&PostVal=${data.postInfo.postVal}`
                        // console.log('upload ok');
                        setSubmitCheckDialOpen(false);
                        window.location.href=`${mainUrl}/postPage?BomNo=${data.postInfo.BomNo}&Category=${data.postInfo.Category}&Pr=${data.postInfo.Pr}&PostVal=${data.postInfo.postVal}`
                    }else if(data.message==='invalidUser'){
                        alert('invalid user');
                    }
                    else{
                        alert('undefined');
                    }
                })
                
            } else {
                alert('로그인이 기간이 만료 되었습니다.');
                // if(process.env.NODE_ENV==='production'){
                //     window.location.href='http://www.shbom.com';
                // }else{
                //     window.location.href='http://localhost:3000';
                // }
                window.location.href=mainUrl;
            }
        })
    }

    const editorChange = async (moduler, editor, editorData) => {
        setPostModule(
            postModule.map(row =>
                row.id === moduler.id ? { ...row, editor: editor, editorData: editorData } : row
            )
        )
    }

    // post preview 관련
    const _handlePostPreviewDialOpen = () => {
        setPostPreviewDialOpen(true);
    }

    const _handlePostPreviewDialClose = () => {
        setPostPreviewDialOpen(false);
    }

    // snackbar 관련
    const handleSubmitErrorSnackbarClose = () =>{
        setSubmitErrorSnackbarOpen(false);
    }

    //file upload 관련
    const handleFileUploaded = async(e) =>{
        if (e.target.files.length !== 0) {
            setImageUploadLoading(true);
            const filesize = e.target.files.length;
            const formData = new FormData();
            for (let i = 0; i < filesize; i++) {
                let filedata = e.target.files[i];
                formData.append(`commonfile`, filedata);
            }

            await editorApi.uploadFile2Oss(formData, handleSetUploadPercentage)
            .then(data=>{
                if(data){
                    if(data.message==='successOne' || data.message==='successMultiple'){
                        //concat 은 개별적으로든 배열로든 추가가능 그래서 멀티와 싱글을 한번에 처리
                        setCommonFiles(commonFiles.concat(data.file));
                        setImageUploadLoading(false);
                        document.getElementById('commonfile').value = '';
                    }else if(data.message==='maybeEmpty'){
                        alert('파일이 비었거나, 업로드 할 수 없는 파일 입니다.');
                        setImageUploadLoading(false);
                    }else{
                        alert('undefined');
                        setImageUploadLoading(false);
                    }
                }else{
                    setImageUploadLoading(false);
                }
                
            })
            
        }
    }

    const handleFileDeleteIndex = async(thisfile) =>{
        // this.setState({commonFiles:this.state.commonFiles.filter(idx=>idx.url!==thisfile.url)});
        setCommonFiles(commonFiles.filter(idx=>idx.url!==thisfile.url));
    }

    return (
        <>
            {/* **
                Main Body Component
            */}
            {/* {console.log(userNickname)} */}
            <EditorBody
                userNickname={userNickname}
                postModule={postModule}
                pathData={pathData}
                postTitle={postTitle}
                editorDialOpen={editorDialOpen}
                selectedModule={selectedModule}
                commonFiles = {commonFiles}

                // post title controller
                handlePostTitleChange={handlePostTitleChange} //  change post title...

                // post Module controller
                addPostModule={addPostModule}
                deletePostModule={deletePostModule}

                //Video controller
                handleUploadVideo={handleUploadVideo}
                onVideoUpload={onVideoUpload}
                handleUploadThumbnail={handleUploadThumbnail}
                onThumbnailUpload={onThumbnailUpload}
                handleDeleteVideo={handleDeleteVideo}

                //Image controller
                handleUploadImage={handleUploadImage}
                onImageUpload={onImageUpload}
                handleImageDetailDialOpen={handleImageDetailDialOpen}
                handleImageArrayRearrangeDialOpen={handleImageArrayRearrangeDialOpen}
                handleImageSliderFormSet={handleImageSliderFormSet}

                // editor
                _handleEditorDialOpen={_handleEditorDialOpen}
                _handleEditorDialUpdate={_handleEditorDialUpdate}
                _handleEditorDialClose={_handleEditorDialClose}
                _handlePostPreviewDialOpen={_handlePostPreviewDialOpen}
                _handleSubmitOnClick={_handleSubmitOnClick}

                //commonFile controller
                handleFileUploaded = {handleFileUploaded}
                handleFileDeleteIndex = {handleFileDeleteIndex}

                editorChange={editorChange}
            />

            {/* **
                Dialogs
            */}
            <PostPreviewDial
                // state
                postPreviewDialOpen={postPreviewDialOpen}
                postTitle={postTitle}
                postModule={postModule}

                //controller
                _handlePostPreviewDialClose={_handlePostPreviewDialClose}
            />


            {selectedImage &&
                <ImageDetailDial
                    //  state
                    imageDetailDialOpen={imageDetailDialOpen}
                    selectedImage={selectedImage}

                    //  controller
                    handleImageDetailDialClose={handleImageDetailDialClose}
                    handleImageDelete={handleImageDelete}
                />
            }
            <PostSubmitDial
                //state
                submitCheckDialOpen={submitCheckDialOpen}

                //controller
                _handleSubmitDialClose={_handleSubmitDialClose}
                _handleSubmitAgree={_handleSubmitAgree}
            />

            {imageArrayRearrangeDialOpen && selectedModule &&
                <ImageArrayRearrangeDial
                    //state
                    selectedModule = {selectedModule}

                    imageArrayRearrangeDialOpen = {imageArrayRearrangeDialOpen}
                    handleImageArrayRearrangeDialClose = {handleImageArrayRearrangeDialClose}
                />
            }
            


            {/* **
                Loadings
            */}

            <ImageUploadLoading
                //state
                imageUploadLoading={imageUploadLoading}
                uploadPercentage={uploadPercentage}
                //controller
                handleImageArrayRearrangeDialClose = {handleImageArrayRearrangeDialClose}
            />

            {/* **
                SnackBars
            */}
            <Snackbar open={submitErrorSnackbarOpen} autoHideDuration={3000} onClose={handleSubmitErrorSnackbarClose}>
                <Alert onClose={handleSubmitErrorSnackbarClose} severity="error">
                    적어도 하나 이상의 모듈을 작성하여 주십시오.
                </Alert>
            </Snackbar>
        </>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default EditorMain;