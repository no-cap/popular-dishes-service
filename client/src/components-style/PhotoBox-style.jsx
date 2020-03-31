import styled from 'styled-components';

export const PhotoBoxFormat = styled.div`
    position: fixed;
    background-color: black;
    height: 600px;
    width: 800px;
    overflow: hidden;
    margin-left: -700px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    align-content: center;
`;


export const PhotoImage = styled.img`
    height: ${ props => props.size === 'tooTall' ? 'auto' : '600px'};
    width: ${ props => props.size === 'tooTall' ? '800px' : 'auto'};
`;


export const LeftArrow = styled.button`
    position: absolute;
    margin-top: 308.5px;
    left: -690px;
    border-top: 6px solid white;
    border-bottom: transparent;
    border-left: transparent;
    border-right: transparent;
    background-color: transparent;
    width: 46px;
    transform: rotate(239deg);
    border-radius: 2px;
    outline-width: 0;
    opacity: 50%;
    &:after {
        content: "";
        border: solid white;
        border-width: 1.25px;
        border-radius: 2px;
        left: 49.9px;
        top: -6.7px;
        transform: rotate(157deg);
        position: absolute;
        border-width: 46px 6px 0px 0px; 
    }
    
    &:hover {
        cursor: pointer;
        opacity: 100%;
    }

    &:hover::after {
        opacity: 100%
    }
`;

export const RightArrow = styled.button`
    position: absolute;
    left: 40px;
    margin-top: 269.5px;
    border-top: 6px solid white;
    border-bottom: transparent;
    border-left: transparent;
    border-right: transparent;
    background-color: transparent;
    width: 46px;
    transform: rotate(59deg);
    border-radius: 2px;
    outline-width: 0;
    opacity: 50%;
    &:after {
        content: "";
        border: solid white;
        border-width: 1.25px;
        border-radius: 2px;
        left: 49.9px;
        top: -6.7px;
        transform: rotate(155deg);
        position: absolute;
        border-width: 46px 6px 0px 0px;
    }
    
    &:hover {
        cursor: pointer;
        opacity: 100%;
    }

    &:hover::after {
        opacity: 100%
    }
`;

export const Caption = styled.div`
    position: absolute;
    bottom: 20px;
    margin-left: -675px;
    white-space: normal;
    color: white;
    width: 650px;
`;

export const Caption2 =  styled.div`
    background-color: black;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    position: absolute;
    white-space: normal;
    bottom: 0px;
    padding-left: 25px;
    padding-right: 125px;
    width: 650px;
    border-bottom-left-radius: 10px;
`; 

export const CaptionCropper = styled.div`
    position: absolute;
    bottom: 0px;
    margin-left: -700px;
    opacity: 40%;
`;

export const Photos = styled.div`
    position: absolute;
    color: white;
    bottom: 20px;
    margin-left: 0px;
`;