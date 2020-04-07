import React from 'react';
import styled from 'styled-components';
import Star from './Star';
import StarType from './StarStyles';

const FiveStars = styled.div`
  position: absolute;
  & > div {
    display: inline-block;
  }
`;

const StarBox = ({ rating }) => {
  const arr = [0, 1, 2, 3, 4];
  return (
    <FiveStars>
      {arr.map((box, i) => (<StarType rating={i < rating ? rating : 'none'}><Star /></StarType>))}
    </FiveStars>
  );
};

export default StarBox;
