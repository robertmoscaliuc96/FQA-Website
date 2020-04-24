import React from 'react';
import { renderIntoDocument, cleanup } from '@testing-library/react';
import ReactDOM from "react-dom";
import {shallow} from 'enzyme';


import Routes from './components/routing/Routes'
import Spinner from '../src/components/layout/Spinner';
import Landing from '../src/components/layout/Landing';
import CommentItem from './components/post/CommentItem';
import CommentForm from './components/post/CommentForm';
import NotFound from '../src/components/layout/NotFound';
import alertReducer from '../src/reducers/alert';

import {SET_ALERT} from './actions/type';
afterEach(cleanup)

it(" Spinner renders without crashing", () => {
    const div = document.createElement("section");
    ReactDOM.render(<Spinner></Spinner>, div)
});

// Landing
describe('Landing', () =>{
  it(" Landing renders without crashing", () => {
    const component = shallow(<Landing></Landing>);
    const wrapper = component.find('.landing')
    expect(wrapper.length).toBe(1)
  });


  it(" Landing buttons renders without crashing", () => {
    const component = shallow(<Landing></Landing>);
    const wrapper = component.find('.buttons')
    expect(wrapper.length).toBe(1)
  });

});

// Login
describe('NotFound', () =>{
  it(" NotFound renders without crashing", () => {
    const notfound = shallow(<NotFound></NotFound>);
    const wrapper = notfound.find('.x-large text-primary')
    expect(wrapper.length).toBe(0)

  });

  it(" NotFOund renders without crashing", () => {
    const notfound = shallow(<NotFound></NotFound>);
    const wrapper = notfound.find('.large')
    expect(wrapper.length).toBe(1)

  });
});

describe('Routes', () =>{
  it(" Navbar renders without crashing", () => {
    const navbar = shallow(<Routes></Routes>);

    const wrapper = navbar.find('.container')
    expect(wrapper.length).toBe(1)

  });

});



const setUp = (props={}) =>{
  const component = shallow(<CommentItem {...props}/>)
  return component
}



describe ('Alert Reducer', () =>{
  it('Should return default state', () => {
    const newState = alertReducer(undefined,{});
    expect(newState).toEqual([])
  })

})



