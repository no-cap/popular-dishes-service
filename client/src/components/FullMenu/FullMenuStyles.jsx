import styled from 'styled-components';

export const FullMenuFormat = styled.div`
  position: fixed;
  background-color: white;
  width: 75%;
  height: 600px;
  border-radius: 10px;
  overflow-y: scroll;
  display: inline-block;
  left: 12.5%;
  padding: 10px;
  line-break: auto;
  top: 50px;
  h3 {
    margin-top: -3px;
  };
`;

export const Item = styled.div`
  border-top: 1px solid #e6e6e6;
  padding-left: 10px;
  height: 80px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const StarLocation = styled.div`
  margin-top: -2.75px;
  position: relative;
`;

export const SquarePhoto = styled.div`
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 5px;  
  img {
    height: 70px;
  };
`;

export const PhotoDescription = styled.div`
  margin-top: -73px;
  margin-left: 75px;
  font-size: 15px;
`;

export const Name = styled.div`
  color: #0073bb;
  font-weight: 550;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  };
`;

export const Price = styled.div`
  margin-left: 90%;
  margin-top: -55px;
  font-size: 15px;
  font-weight: 600;
`;

export const TextDescription = styled.div`
  padding-bottom: 5px;
`;

export const Reviews = styled.div`
  margin-top: -15px;
  margin-left: 17px;
  font-size: 13px;
  color: #aeaeae;
`;

export const CameraFormat = styled.div`
  margin-top: -16.5px;
  margin-left: 100px;
  fill: #aeaeae;
  height: 16px;
  width: 16px;
`;

export const StarFormat = styled.div`
  fill: #aeaeae;
  height: 14.5px;
  width: 14.5px;
  margin-top: .5px;
`;

export const Photos = styled.div`
  margin-top: -15px;
  margin-left: 120px;
  font-size: 13px;
  color: #aeaeae;
`;