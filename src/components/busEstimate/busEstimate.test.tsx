import React from 'react';
import BusEstimate from './busEstimate';
import StubBusTrackerAPI from '../../Services/stubBusTrackerAPI';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react'

afterEach(cleanup)
it("inserts estimate time", async () => {
    const { getByText, getByTestId } = render(<BusEstimate api={StubBusTrackerAPI} />);
    fireEvent.click(getByText('Get Estimate'))

    const greetingTextNode = await waitForElement(() =>
        getByTestId('estimate')
    )
    expect(greetingTextNode).toMatchSnapshot()
});

