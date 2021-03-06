import Axios from 'axios';
import {serverUrl} from '../config/serverUrl';
import AuthKey from '../config/AuthorizationKey';

const VIDEO_UPLOAD_API = `${serverUrl}/api/uploadimg/draft-oss/video/upload` //must defined;
const VIDEOTHUMBNAIL_UPLOAD_API = `${serverUrl}/api/uploadimg/draft-oss/videothumbnail/upload` //must defined;
const IMAGE_UPLOAD_API = `${serverUrl}/api/uploadimg/draft-oss` //must defined;
const FILE_UPLOAD_API = `${serverUrl}/api/uploadimg/draft-oss/file/upload`  //must defined
const POST_WRITE_API = `${serverUrl}/api/shb/post/writepost/sheditor/v1`    //must defined
const AUTHORIZATION_KEY = 'Bearer ' + AuthKey    //must defined


const uploadVideo2Oss = async(formData, handleSetUploadPercentage) => {
    console.log(formData);
    return await Axios.post(VIDEO_UPLOAD_API, formData, {
        onUploadProgress: progressEvent => {
            // console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            let percentCompleted = Math.floor((progressEvent.loaded * 100)/progressEvent.total);
            handleSetUploadPercentage(percentCompleted);
        },
        headers: {
            Authorization: AUTHORIZATION_KEY
        }
    })
    .then(res => res.data)
    .catch(err=>{
        alert('undefined');
    })
}

const uploadVideoThumbnail2Oss = async(formData, handleSetUploadPercentage)=>{
    console.log(formData);
    return await Axios.post(VIDEOTHUMBNAIL_UPLOAD_API, formData, {
        onUploadProgress: progressEvent => {
            // console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            let percentCompleted = Math.floor((progressEvent.loaded * 100)/progressEvent.total);
            handleSetUploadPercentage(percentCompleted);
        },
        headers: {
            Authorization: AUTHORIZATION_KEY
        }
    })
    .then(res => res.data)
    .catch(err=>{
        alert('undefined');
    })
}

const uploadImage2Oss = async(formData, handleSetUploadPercentage) => {
    return await Axios.post(IMAGE_UPLOAD_API, formData, {
        onUploadProgress: progressEvent => {
            // console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            let percentCompleted = Math.floor((progressEvent.loaded * 100)/progressEvent.total);
            handleSetUploadPercentage(percentCompleted);
        },
        headers: {
            Authorization: AUTHORIZATION_KEY
        }
    })
    .then(res => res.data)
    .catch(err=>{
        alert('undefined');
    })
}

const uploadFile2Oss = async(formData,handleSetUploadPercentage) =>{
    return await Axios.post(FILE_UPLOAD_API, formData, {
        onUploadProgress: progressEvent => {
            // console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            let percentCompleted = Math.floor((progressEvent.loaded * 100)/progressEvent.total);
            handleSetUploadPercentage(percentCompleted);
        },
        headers: {
            Authorization: 'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('undefined');
    })
}

const postWrtie2Server = async(usid, postTitle, postData, commonFiles, BomNo, Category, Pr) =>{
    return await Axios.post(POST_WRITE_API,{
        usid:usid,
        postTitle:postTitle,
        postData:postData,
        commonFiles:commonFiles,
        BomNo:BomNo,
        Category:Category,
        Pr:Pr
    },{
        headers: {
            Authorization: 'Bearer ' + AuthKey
        }
    })
    .then(res=>res.data)
}

const getInformationPath = async (BomNo,Category) =>{
    return await Axios.get(`${serverUrl}/api/shb/shbItem/getOne`,{
        params:{
            shb_num:BomNo,
            shb_item_id:Category
        },
        headers: {
            Authorization: 'Bearer ' + AuthKey
        }
    })
    .then(res=>res.data)
}

const _Authentication = async (cookieSession) => {
    // console.log(cookieSession);
    return await Axios.post(`${serverUrl}/api/auth/authentication`, {
        usid: cookieSession
    }, {
        headers: {
            Authorization: 'Bearer ' + AuthKey
        }
    }
    )
    .then(response => response.data)
    .catch(err => alert('서버를 다시 확인해 주세요'));
}
export {
    uploadVideo2Oss,
    uploadVideoThumbnail2Oss,
    uploadImage2Oss,
    uploadFile2Oss,
    postWrtie2Server,
    getInformationPath,
    _Authentication
}



