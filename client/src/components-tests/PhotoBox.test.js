import React from 'react';
import { shallow, mount } from 'enzyme';
import PhotoBox from '../components/PhotoBox.jsx';
import PhotoEntry from '../components/PhotoEntry.jsx';

// data for one multiple photos
var photos = [
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

// for making a mock event
const mockEventGenerator = (str) => {
    return {
        target: {
            name: 'todo',
            value: str,
        },
        preventDefault: () => { },
    };
};


// all the tests
describe('PhotoBox Unit test', () => {
    // just seeing if the component even renders correctly
    describe('PhotoBox should render correctly', () => {
        test('PhotoBox should render correctly in "debug" mode', () => {

            const wrapper = shallow(<PhotoBox photos={photos} />);

            expect(wrapper).toMatchSnapshot();
        });

        test('PhotoBox should have only 1 PhotoEntry', () => {

            const wrapper = mount(<PhotoBox photos={photos} />);

            expect(wrapper.find('PhotoEntry')).toHaveLength(1);
        });
    })
    // making sure the component's click handler reacts correctly
    describe('PhotoBox Unit Interaction test', () => {
        describe('onClickHandler', () => {
            test('it should invoke the correct method when a change event is emitted', () => {
                const mockClickHandler = jest.fn();
                const wrapper = shallow(<PhotoBox photos={photos} />);
                wrapper.instance().onClickHandler = mockClickHandler;
                wrapper.instance().forceUpdate();
                wrapper.find('button').at(0).simulate('click');
                wrapper.find('button').at(1).simulate('click');
                expect(mockClickHandler).toHaveBeenCalled();
            });
            // testing that click button increase photo count
            test('it should correctly update the state when a change event is emitted', () => {
                const wrapper = shallow(<PhotoBox photos={photos} />);
                // wrapper.find('button').at(0).simulate('click');
                // expect(wrapper.instance().state.currentPhoto).toBe(7);
                wrapper.find('button').at(1).simulate('click', mockEventGenerator('right'));
                expect(wrapper.instance().state.currentPhoto).toBe(1);
                expect(wrapper.find('.photo-number').text()).toEqual('2 of 4');
                wrapper.find('button').at(1).simulate('click', mockEventGenerator('left'));
                expect(wrapper.instance().state.currentPhoto).toBe(0);
                wrapper.find('button').at(1).simulate('click', mockEventGenerator('left'));
                expect(wrapper.instance().state.currentPhoto).toBe(photos.length - 1);
                expect(wrapper.find('.photo-number').text()).toEqual('4 of 4');
                wrapper.find('button').at(1).simulate('click', mockEventGenerator('right'));
                expect(wrapper.instance().state.currentPhoto).toBe(0);
                expect(wrapper.find('.photo-number').text()).toEqual('1 of 4');
            });
        });
    });

})
