import styled from 'styled-components';

const StarType = styled.div`
  height: ${ props => 
    (props.type === 'mini') ? 14 : 
    (props.type === 'star') ? 14 : 
    18 }px;

  width: ${ props =>
    (props.type === 'mini') ? 14 :
    (props.type === 'star') ? 14 :
    18 }px;

  fill: ${ props => 
    props.rating === 1 ? 'khaki' : 
    props.rating === 2 ? 'gold' : 
    props.rating === 3 ? 'darkorange':
    props.rating === 4 ? 'orangered' :
    props.rating === 'none' ? '#d8d8d8' :
    props.rating === 'darknone' ? '#aeaeae' :
    '#d32323' 
  };

  position: relative;
`;

export default StarType;