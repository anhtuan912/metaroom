import React from 'react';
import { shallow } from 'enzyme';
import PinInput from './../src/PinInputContainer';

describe('Pin Input', () => {
  let wrapper;
  let onCompleteMock;

  beforeEach(() => {
    onCompleteMock = jest.fn();
    wrapper = shallow(<PinInput onComplete={onCompleteMock} />);
  });

  test('renders the correct number of input boxes', () => {
    expect(wrapper.find('input').length).toBe(4);

    wrapper.setProps({ length: 6 });
    expect(wrapper.find('input').length).toBe(6);
  });

  test('only allows digits in the input boxes', () => {
    const input = wrapper.find('input').at(0);

    input.simulate('change', { target: { value: '1' } });
    expect(input.prop('value')).toBe('1');

    input.simulate('change', { target: { value: 'a' } });
    expect(input.prop('value')).toBe('1');
  });

  test('moves focus to the next input box after entering a digit', () => {
    const inputs = wrapper.find('input');

    inputs.at(0).simulate('change', { target: { value: '1' } });
    expect(document.activeElement).toEqual(inputs.at(1).getDOMNode());

    inputs.at(1).simulate('change', { target: { value: '2' } });
    expect(document.activeElement).toEqual(inputs.at(2).getDOMNode());
  });

  test('masks the input boxes in secret mode', () => {
    wrapper.setProps({ secretMode: true });
    expect(wrapper.find('input').at(0).prop('type')).toBe('password');
  });

  test('autofocuses on the first input box', () => {
    expect(document.activeElement).toEqual(wrapper.find('input').at(0).getDOMNode());
  });

  test('invokes the onComplete method after all boxes are filled', () => {
    const inputs = wrapper.find('input');

    inputs.at(0).simulate('change', { target: { value: '1' } });
    inputs.at(1).simulate('change', { target: { value: '2' } });
    inputs.at(2).simulate('change', { target: { value: '3' } });
    inputs.at(3).simulate('change', { target: { value: '4' } });

    expect(onCompleteMock).toHaveBeenCalledWith('1234');
  });

  test('allows pasting', () => {
    const input = wrapper.find('input').at(0);

    input.simulate('paste', { clipboardData: { getData: () => '1234' } });
    expect(input.prop('value')).toBe('1');
    expect(document.activeElement).toEqual(wrapper.find('input').at(1).getDOMNode());
  });
})