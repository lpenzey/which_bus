import React from 'react';
import BusEstimateComponent from './busEstimateComponent';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import StubBusTrackerAPI from '../../Services/StubBusTrackerAPI'
import Adapter from 'enzyme-adapter-react-16';

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

describe('<BusEstimateComponent />', () => {
    it('updates state with bus tracker api values', () => {
        Enzyme.configure({ adapter: new Adapter() })
        const wrapper = mount(<BusEstimateComponent api={StubBusTrackerAPI} />);

        const button = wrapper.find('#estimateButton').at(0);
        button.simulate('click');

        return flushPromises().then(() => {
            expect(wrapper.state('route')).toEqual("20");
            expect(wrapper.state('time')).toEqual("12:02");
            expect(wrapper.state('stopName')).toEqual("Madison & Jefferson");
            expect(wrapper.state('direction')).toEqual("Westbound");
        });
    });
});
