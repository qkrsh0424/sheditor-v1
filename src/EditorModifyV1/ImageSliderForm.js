import React from 'react';

//styled-component
import styled from 'styled-components';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const tutorialSteps = [
    // {
    //     label: 'San Francisco – Oakland Bay Bridge, United States',
    //     imgPath:
    //         'http://synabrodemo.oss-ap-southeast-1.aliyuncs.com/posterImg/1579533385425FUVIC%20China%20Economic%20Daily%20(0121).jpg',
    // },
    // {
    //     label: 'Bird',
    //     imgPath:
    //         'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    // },
    // {
    //     label: 'Bali, Indonesia',
    //     imgPath:
    //         'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    // },
    // {
    //     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    //     imgPath:
    //         'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    // },
    // {
    //     label: 'Goč, Serbia',
    //     imgPath:
    //         'https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/bannerImage/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%86%B7%E1%84%87%E1%85%A2%E1%84%82%E1%85%A5-%E1%84%83%E1%85%A9%E1%84%83%E1%85%A1%E1%86%B7%E1%84%83%E1%85%A9%E1%84%83%E1%85%A1%E1%86%B7.jpg',
    // },
];

const Container = styled.div`
    margin-bottom:15px;
    padding-top:15px;
    padding-bottom:15px;
    border:1px solid #f0f0f0;
    border-radius: 15px;
`;
const ImageFigure = styled.figure`
    text-align:center;
    background:white;
    margin:0 0;
    
`;

const ImageEl = styled.img`
    object-fit:contain;
    width:100%;
    height:100%;
`;
export default function ImageSliderForm(props) {
    //state
    const {
        imageList
    } = props;

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = imageList.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Container 
            // style={window.innerWidth<='900'?{margin:'0'}:{margin:'0 10%'}}
            className={window.innerWidth<='900'?'':'container'}
        >
            {console.log(imageList)}
            <ImageFigure>
                <ImageEl
                    style={window.innerWidth<='900'?{height:'300px'}:{height:'600px'}}
                    src={imageList[activeStep].imgUrl}
                />
            </ImageFigure>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </Container>
    );
}