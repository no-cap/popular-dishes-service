import React from 'react';
import Star from './star.jsx';
import styled from 'styled-components';
import StarType from '../components-style/TypesOfStars.jsx';

const FiveStars = styled.div`
  position: absolute;
  & > div {
    display: inline-block;
  }
`;



const StarBox = (props) => {
  var arr = [0,1,2,3,4];
  return (
    <FiveStars>
      {arr.map((box, i) => (i < props.rating) ? <StarType rating={props.rating}> <Star /> </StarType> : <StarType rating={'none'}> <Star /> </StarType>)}
    </FiveStars>
  )
}


export default StarBox;