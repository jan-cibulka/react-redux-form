import { render, screen, waitFor } from '@testing-library/react';
// import user from '@testing-library/user-event';
import { Provider } from 'react-redux';

import MockAdapter from 'axios-mock-adapter';
import FormService from '~/src/service/FormService';
import { makeStore } from '../store/store';
import IndexPage from '../pages';

import http from '../common/http';

describe('<Index page />', () => {
  let MockedAxios: any;
  let store: any;

  beforeAll(() => {
    MockedAxios = new MockAdapter(http);
    MockedAxios.onGet('/data').reply(200, [
      { name: 'John Doe', height: 100, file: 'file.png' },
      { name: 'Mark Ray', height: 121, file: 'file2.png' },
    ]);
    store = makeStore();
  });

  it('initialize and display data', async () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    expect(screen.getByText('Mark Ray')).toBeInTheDocument();
  });

  it('submit and display data', async () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Mark Ray')).toBeInTheDocument();

    expect(screen.getByRole('input', { name: 'height' })).toBeInTheDocument();

    // user.click(screen.getByRole('button', { name: /add if odd/i }));

    // expect(screen.getByText('0')).toBeInTheDocument();

    // user.click(screen.getByRole('button', { name: /increment value/i }));
    // user.type(screen.getByLabelText(/set increment amount/i), '{backspace}8');
    // user.click(screen.getByRole('button', { name: /add if odd/i }));

    // await expect(screen.findByText('9')).resolves.toBeInTheDocument();
  });
});
