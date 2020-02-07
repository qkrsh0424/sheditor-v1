import React,{useState, useEffect} from 'react';
import uuidv4 from 'uuid/v4';

//Component
import CKEditorBody from './CKEditorBody';
import CKEditorBody2 from './CKEditorBody2';

const CKEditorMain = () =>{
    const [editorDataArray, setEditorDataArray] = useState([]);

    useEffect(()=>{

    },[])
    return(
        <div>
            {/* <CKEditorBody/> */}
            <CKEditorBody2/>
        </div>
    );
}

export default CKEditorMain;