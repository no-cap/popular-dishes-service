import React from 'react';
import { shallow, mount } from 'enzyme';
import PhotoEntry from '../components/PhotoEntry.jsx';


var sampleData =
{
    url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg',
    caption: 'Red Dragon roll was so good!! We devoured it in record timing!'
}



describe('PhotoEntry Unit Tests', () => {

    describe('PhotoEntry should render correctly', () => {
        test('PhotoEntry should render correctly in "debug" mode', () => {

            const wrapper = shallow(<PhotoEntry photo={sampleData} />);

            expect(wrapper).toMatchSnapshot();
        });

        test('PhotoEntry should have correct caption and photo url', () => {

            const wrapper = mount(<PhotoEntry photo={sampleData} />);

            expect(wrapper.find('.photo-caption').text()).toEqual('Red Dragon roll was so good!! We devoured it in record timing!')
            expect(wrapper.find('img').prop('src')).toEqual('https://s3-media0.fl.yelpcdn.com/bphoto/EhwQv7W3nmJqdXhvCW7pJg/o.jpg');
        });
    });

});

