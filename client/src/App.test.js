import React from 'react';
import { renderIntoDocument, cleanup } from '@testing-library/react';
import ReactDOM from "react-dom";
import Spinner from '../src/components/layout/Spinner';
import Navbar from '../src/components/layout/Navbar';
import {shallow} from 'enzyme';
import Login from './components/auth/Login';

afterEach(cleanup)

it(" Spinner renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Spinner></Spinner>, div)
})

describe ('Navbar Component', () =>{
  it(" Navbar renders without errors", () => {
    const component =shallow(<Navbar></Navbar>);
    ReactDOM.render(<Spinner></Spinner>, div)
})


})


