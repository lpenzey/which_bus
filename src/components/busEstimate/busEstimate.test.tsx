import React from 'react';
import BusEstimate from './busEstimate';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import StubBusTrackerAPI from '../../Services/stubBusTrackerAPI';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

describe('<BusEstimate />', () => {
    Enzyme.configure({ adapter: new Adapter() })
    it('does a snapshot', () => {
        const wrapper = mount(
            <BusEstimate api={StubBusTrackerAPI} />
        );

        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should update text when clicking on button', () => {
        const wrapper = mount(
            <BusEstimate api={StubBusTrackerAPI} />
        );

        const button = wrapper.find('#estimateButton').at(0);
        button.simulate('click');

        return flushPromises().then(() => {
            wrapper.update()
            expect(toJSON(wrapper)).toMatchSnapshot();
        });
    });
});
