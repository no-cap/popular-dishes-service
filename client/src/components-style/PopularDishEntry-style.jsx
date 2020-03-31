import styled from 'styled-components';

export const PhotoImage = styled.img`
    position: relative;
    width: ${props => props.size === 'tooShort' ? '110%' : '100%'};
    height: ${ props => props.size === 'tooTall' ? '100%' : '120%'};
`;

export const Cropper = styled.div`
    position: relative;
    height: 140px;
    overflow: hidden;
`;

export const PopularDish = styled.div`
    border: .5px solid #e6e6e6;
    border-radius: 7px;
    width: 192px; 
    height: 200px; 
    overflow: hidden;
    &:hover {
        box-shadow: 12px 0 15px -6px rgba(31, 73, 125, 0.3), -12px 0 8px -6px rgba(31, 73, 125, 0.3);
    }
`;

export const PopularDishText = styled.div`
    font-size: 12px;
    padding-left: 10px;
    padding-top: 8px;
    line-height: 20px;
    white-space: pre-wrap;
    color: gray;
`;

export const PopularDishName = styled.span`
    font-size: 15px;
    color: black;
    font-weight: bold;
`;

export const PriceBox = styled.div`
    position: relative;
    height: auto;
    width: 192px;
    bottom: 80px;
    white-space: normal;
`;

export const Price = styled.div`
    position: absolute;
    left: 120px;
    padding: 5px 6px 5px 6px;
    background-color: ${props => props.primary ? 'transparent' : 'black' };
    // margin-top: ${props => props.primary ? '-40' : '-90' }px;
    opacity: ${ props => props.primary ? 'none' : '65%'};
    color: ${ props => props.primary ? 'white' : 'transparent'};
    width: 50px;
    border-radius: 6px;
    z-index: ${props => props.primary ? 1 : 0 };
    white-space: normal;
`;