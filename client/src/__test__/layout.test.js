import React from 'react';
import ReactDOM from "react-dom";
import {shallow} from 'enzyme';

import Spinner from '../components/layout/Spinner';
import Landing from '../components/layout/Landing';
import NotFound from '../components/layout/NotFound';
import Navbar from '../components/layout/Navbar';


it(" Spinner renders without crashing", () => {
    const div = document.createElement("section");
    ReactDOM.render(<Spinner></Spinner>, div)
});


describe('Landing', () =>{
    it(" Landing renders without crashing", () => {
      const component = shallow(<Landing></Landing>);
      const wrapper = component.find('.landing')
      expect(wrapper.length).toBe(1)
    });
  
  
    it(" Landing buttons renders without crashing", () => {
      const component = shallow(<Landing></Landing>);
      console.log(component.debug())
      const wrapper = component.find('.buttons')
      expect(wrapper.length).toBe(1)
    });
    it(" Paragraph renders without crashing", () => {
      const component = shallow(<Landing></Landing>);
      const wrapper = component.find('.lead')
      expect(wrapper.length).toBe(1)
    });
    it(" Header renders without crashing", () => {
      const component = shallow(<Landing></Landing>);
      const wrapper = component.find('.x-large')
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

  