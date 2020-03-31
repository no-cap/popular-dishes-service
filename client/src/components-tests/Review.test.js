import React from 'react';
import { shallow, mount } from 'enzyme';
import Review from '../components/Review.jsx';
// data for one user
var singleData =
{
  user: 'Bob',
  text: 'I love corn cheese'
}

// all the tests
describe('Review Unit test', () => {
  // just seeing if the component even renders correctly
  describe('Review should render correctly', () => {
    test('Review should render correctly in "debug" mode', () => {

      const wrapper = shallow(<Review data={singleData} />);

      expect(wrapper).toMatchSnapshot();
    });

    test('Review should have only 1 div', () => {

      const wrapper = mount(<Review data={singleData} />);

      expect(wrapper.find('button')).toHaveLength(1);
    });
  })
  // making sure the component's click handler reacts correctly
  describe('Review Unit Interaction test', () => {
    describe('onClickHandler', () => {
      test('it should invoke the correct method when a change event is emitted', () => {
        const mockClickHandler = jest.fn();
        const wrapper = shallow(<Review data={singleData}/>);
        wrapper.instance().onClickHandler = mockClickHandler;
        wrapper.instance().forceUpdate();
        wrapper.find('button').simulate('click');
        expect(mockClickHandler).toHaveBeenCalled();
      });
      // testing that click button goes from true to false and vice versa
      test('it should correctly update the state when a change event is emitted', () => {
        const wrapper = shallow(<Review data={singleData} />);
        wrapper.find('button').simulate('click');
        expect(wrapper.instance().state.readMore).toBe(true);
        wrapper.find('button').simulate('click');
        expect(wrapper.instance().state.readMore).toBe(false);
      });
    });
  });

})
