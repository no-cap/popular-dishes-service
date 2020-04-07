import React from 'react';
import Star from '../Starbox/Star';
import Camera from '../Camera/Camera';
// eslint-disable-next-line object-curly-newline
import { StarLocation, Item, SquarePhoto, PhotoDescription, Name, Price, TextDescription, Reviews, CameraFormat, StarFormat, Photos } from '../FullMenu/FullMenuStyles';


const MenuItem = ({ data }) => (
  <Item>
    <SquarePhoto>
      <img src={(data.photos.length > 0) ? data.photos[0].url : 'https://s3-media0.fl.yelpcdn.com/assets/2/www/img/dca54f97fb84/default_avatars/menu_medium_square.png'} />
    </SquarePhoto>
    <PhotoDescription>
      <Name>{data.item.dish_name}</Name>
      <TextDescription>{data.item.description}</TextDescription>
      <StarLocation>
        <StarFormat>
          <Star />
        </StarFormat>
      </StarLocation>
      <Reviews>{(data.item.review_count > 1) ? `${data.item.review_count} reviews` : `${data.item.review_count} review`}</Reviews>
      {(data.photos.length) ? <CameraFormat><Camera /></CameraFormat> : null}
      <Photos>{(data.photos.length > 1) ? `${data.photos.length} photos` : (data.photos.length === 0) ? null : `${data.photos.length} photo`}</Photos>
    </PhotoDescription>
    <Price>{`${data.item.price}`}</Price>
  </Item>
);

export default MenuItem;
