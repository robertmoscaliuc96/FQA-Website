import React from 'react';
import {shallow} from 'enzyme';

import Routes from '../components/routing/Routes'


describe('Routes', () =>{
    it(" Navbar renders without crashing", () => {
      const navbar = shallow(<Routes></Routes>);
  
      const wrapper = navbar.find('.container')
      expect(wrapper.length).toBe(1)
  
    });
  
  });