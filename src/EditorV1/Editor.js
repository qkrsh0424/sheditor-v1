import React,{useState, useEffect, lazy} from 'react';
//URL
import {mainUrl} from '../config/mainUrl';
//cookie
import cookie from 'react-cookies';

//query-string
import queryString from 'query-string';

//api
import * as editorApi from './EditorAPI';
//Component
// import EditorMain from './EditorMain';
const EditorMain = lazy(()=>import('./EditorMain'));


const Editor = (props) =>{
    const [cookiesUSID,setCookiesUSID] = useState(cookie.load('usid'));
    const [userNickname,setUserNickname] = useState(null);
    const [queryValues, setQueryValues] = useState(queryString.parse(props.location.search));
    const [userChecked, setUserChecked] = useState(false);

    useEffect(() => {
        handleUserCheck();
    }, []);

    //Authentication
    const handleUserCheck = () =>{
        editorApi._Authentication(cookiesUSID)
        .then(data => {
              
            if (data.message === 'connect success') {
                setUserNickname(data.user_nickname);
                setUserChecked(true);
                return;
            } else {
                alert('로그인이 필요합니다.');
                // if(process.env.NODE_ENV==='production'){
                //     window.location.href='http://www.shbom.com';
                // }else{
                //     window.location.href='http://localhost:3000';
                // }
                window.location.href=mainUrl
            }
        })
    }

    return(
        <div>
            {userChecked && 
                <EditorMain
                    imageUploadApi = {'/abc'}
                    cookiesUSID={cookiesUSID}
                    userNickname={userNickname}
                    queryValues={queryValues}
                />
            }
        </div>
        
    );
}

export default Editor;