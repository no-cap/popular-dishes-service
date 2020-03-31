import styled from 'styled-components';

export const CloseButton = styled.button`
    position: absolute;
    font-size: 20px;
    background-color: transparent;
    color: white;
    margin-top: -310px;
    margin-left: 530px;
    border: none;
    outline-width: 0;
`;

export const ModalStyle = styled.div`
    background-color: rgba(0,0,0,0.5);  
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CloseFormat = styled.div`
    position: absolute;
    font-size: 15px;
    margin-top: 2px;
    margin-left: -45px;
    font-weight: normal;
    &:hover {
        text-decoration: underline;
    }
`;

export const DishButtons = styled.div`
    position: fixed;
`;

