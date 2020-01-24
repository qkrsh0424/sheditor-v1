import Axios from 'axios';
import {serverUrl} from '../config/serverUrl';
import AuthKey from '../config/AuthorizationKey';

const IMAGE_UPLOAD_API = `${serverUrl}/api/uploadimg/draft-oss` //must defined;
const AUTHORIZATION_KEY = 'Bearer ' + AuthKey    //must defined


const uploadImage2Oss = async(formData) => {
    return await Axios.post(IMAGE_UPLOAD_API, formData, {
        // onUploadProgress: progressEvent => {
        //     console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        // }
        headers: {
            Authorization: AUTHORIZATION_KEY
        }
    })
        .then(res => res.data)
}

export {
    uploadImage2Oss
}