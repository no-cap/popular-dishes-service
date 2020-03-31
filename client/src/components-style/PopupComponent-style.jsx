
import styled from 'styled-components';

export const SmallDescriptionFormatter = styled.div`
  position: absolute;
  margin-top: 20px;
  margin-left: 120px;
`;

export const SmallDescriptionBorder = styled.div`
  position: relative;
  font - size: 14.5px;
  white - space: normal;
  width: 260px;
  height: 40px;
`;

export const ItemDescription = styled.div`
  position: fixed;
  margin-left: 350px; 
  background-color: white;
  height: 600px;
  width: 500px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ReviewsFormatter = styled.div`
  position: fixed;
  overflow-y: scroll;
  height: 510px;
  width: 355px;
  margin-left: 120px;
  margin-top: 90px;
  button {
    position: relative;
    margin-top: 0px;
    background: transparent;
    border: none;
    outline: none;
    color: #0073bb;
    margin-left: -7px;
    padding-bottom: 10px;
  }
  button:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Name= styled.div`
  font-size: 25px;
  font-weight: bold;
`;

export const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
`;