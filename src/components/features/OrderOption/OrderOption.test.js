import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='Icons' type='icons'/>);
    expect(component).toBeTruthy();
    // console.log(component.debug());
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('should render `name` prop in title', () => {
    const expectedName = 'Expected Name';
    const component = shallow(<OrderOption name={expectedName} />);
    expect(component).toEqual({});
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons' : {
        /* tests for icons */
        it('contains div component and Icons', () => {
          const div = renderedSubcomponent.find('div.component');
          expect(div.length).toBe(1);

          const noIcon = div.find('Icon[name="times-circle"]').length;
          expect(noIcon).toBe(1);

          const icons = div.find('Icon').not('Icon[name="times-circle"]');
          expect(icons.length).toBe(mockProps.values.length);
          expect(icons.at(0).prop('name')).toBe(mockProps.values[0].icon);
          expect(icons.at(1).prop('name')).toBe(mockProps.values[1].icon);
        });
        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div.icon').at(mockProps.values.length-1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });
        break;
      }
      case 'checkboxes' : {
        /* tests for checkbox */
        it('contains checkboxes div and labels', () => {
          const div = renderedSubcomponent.find('div.checkboxes');
          expect(div.length).toBe(1);

          const labels = div.find('label');
          expect(labels.length).toBe(mockProps.values.length);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`[value="${testValue}"]`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'number' : {
        /* tests for number */
        it('contains input and min/max limits', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
        
          expect(input.find('input').prop('min')).toBe(mockProps.limits.min);
          expect(input.find('input').prop('max')).toBe(mockProps.limits.max);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.number input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text' : {
        it('contains input', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
        });
        break;
      }
      case 'date' : {
        it('contains input', () => {
          const input = renderedSubcomponent.find(DatePicker);
          expect(input.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}