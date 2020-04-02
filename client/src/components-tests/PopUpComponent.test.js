import React from 'react';
import { shallow, mount } from 'enzyme';
import PopUpComponent from '../components/PopUpComponent.jsx';
import Review from '../components/Review.jsx';
import PhotoEntry from '../components/PhotoEntry.jsx';
import SmallDescription from '../components/smallDescription.jsx';

var sampleItem = {
  name: 'Corn Cheese',
  price: 8.50,
  description: 'Corn with Cheese'
}

var sampleReviews = [
  {
    user: 'Bob',
    text: 'I love corn cheese'
  },
  {
    user: 'Bob',
    text: 'I love corn cheese'
  },
  {
    user: 'Bob',
    text: 'I love corn cheese'
  }
];

var samplePhotos = [
  {
    url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
    caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
  },
  {
    url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
    caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
  },
  {
    url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
    caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
  },
  {
    url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
    caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
  }
];


// all the tests
describe('PopUpComponent Unit test', () => {
  // just seeing if the component even renders correctly
  describe('PopUpComponent should render correctly', () => {
    test('PopUpComponent should render correctly in "debug" mode', () => {

      const wrapper = shallow(<PopUpComponent item={sampleItem} photos={samplePhotos} reviews={sampleReviews}/>);

      expect(wrapper).toMatchSnapshot();
    });

    test('PopUpComponent should have the same number of children as there are in their respective arrays', () => {
      const wrapper = mount(<PopUpComponent item={sampleItem} photos={samplePhotos} reviews={sampleReviews} />);
      expect(wrapper.find(Review)).toHaveLength(sampleReviews.length);
      expect(wrapper.find(PhotoEntry)).toHaveLength(1);
      expect(wrapper.find(SmallDescription)).toHaveLength(1);
    });
  });
});