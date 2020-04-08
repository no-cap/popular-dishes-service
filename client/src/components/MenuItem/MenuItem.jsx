import React from 'react';
import Star from '../Starbox/Star';
import Camera from '../Camera/Camera';
// eslint-disable-next-line object-curly-newline
import { StarLocation, Item, SquarePhoto, PhotoDescription, Name, Price, TextDescription, Reviews, CameraFormat, StarFormat, Photos } from '../FullMenu/FullMenuStyles';


const MenuItem = ({ dish }) => {
  const { reviews } = dish;
  const photos = reviews.map((review) => review.photoUrl);
  return (
    <Item>
      <SquarePhoto>
        <img src={(photos.length > 0) ? photos[0] : 'https://s3-media0.fl.yelpcdn.com/assets/2/www/img/dca54f97fb84/default_avatars/menu_medium_square.png'} />
      </SquarePhoto>
      <PhotoDescription>
        <Name>{dish.dishName}</Name>
        <TextDescription>{dish.description}</TextDescription>
        <StarLocation>
          <StarFormat>
            <Star />
          </StarFormat>
        </StarLocation>
        <Reviews>{`${reviews.length} review${reviews.length > 1 ? 's' : ''}`}</Reviews>
        {(photos.length) ? <CameraFormat><Camera /></CameraFormat> : null}
        <Photos>{`${photos.length} photo${photos.length > 1 ? 's' : ''}`}</Photos>
      </PhotoDescription>
      <Price>{`${dish.price}`}</Price>
    </Item>
  );
};

export default MenuItem;
