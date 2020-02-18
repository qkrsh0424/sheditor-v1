import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

//URL
import {mainUrl} from '../config/mainUrl';
const Container=styled.div`
padding: 120px 0;


.top{
    /* align-content:center; */
    border-bottom:1px solid #bdbebf;
    padding-bottom:60px;
    margin-bottom:60px;
}
.yellow{
    color:#F8BA01;
    font-size:60px;
    font-weight:500;
}

.errorName{
    padding-top:30px;
    font-size:60px;
    font-weight:600;
}

.errorContent{
    font-size:20px;
    opacity:0.7;
}

.link{
    font-size:20px;
    color:#F8BA01;
    text-decoration:none;

}
`;
class ErrorPageBody extends React.Component{
    render(){
        return (
            <Container>
                <div className="container text-center">
                    <div className="top text-center">
                        <h1 className="yellow">상해봄</h1>
                        <p className="errorName">404</p>
                        <p className="errorContent">페이지를 찾을수 없습니다</p>
                    </div>
                    <div className="bottom">
                        <a href={mainUrl} className="link">
                            상해봄으로 돌아가기 →
                        </a>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ErrorPageBody;