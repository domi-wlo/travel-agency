import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct address', () => {
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id='abc' />);
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });
  it('should render correct image and alt', () => {
    const expectedSrc = 'imagesource.jpg';
    const expectedAlt = 'altDescription';

    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt}/>);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });
  it('should render correct props', () => {
    const expectedName = 'example';
    const expectedCost = '100';
    const expectedDays = 2;
    const component = shallow(<TripSummary name={expectedName} days={expectedDays} cost={expectedCost} />);

    //name
    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);

    //cost
    expect(component.find('.details span').at(1).text()).toBe('from ' + expectedCost);

    //days
    expect(component.find('.details span').at(0).text()).toBe(expectedDays + ' days');
  });
  it('should render without crashing', () => {
    const component = shallow(<TripSummary/>);
    expect(component).toBeTruthy();
  });
  it('should render render tag spans in order', () => {
    const tags = [1,2,3];
    const component = shallow(<TripSummary tags = {tags} />);
    expect(component.find('.tags span').at(0).text()).toBe('1');
    expect(component.find('.tags span').at(1).text()).toBe('2');
    expect(component.find('.tags span').at(2).text()).toBe('3');
  });
  it('should render properly without tags defined', () => {
    const component = shallow(<TripSummary />);
    expect(component).toBeTruthy();
  });
});