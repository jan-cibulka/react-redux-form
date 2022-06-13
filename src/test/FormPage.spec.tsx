import { readFileSync } from 'fs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { EnhancedStore } from '@reduxjs/toolkit';
import { makeStore } from '../store/store';
import IndexPage from '../pages';
import http from '../common/http';

function route(path = '') {
  return typeof path === 'string' ? new RegExp(path.replace(/:\w+/g, '[^/]+')) : path;
}

describe('render', () => {
  let MockedAxios: any;
  let store: EnhancedStore;
  let file: File;
  let largeFile: File;

  beforeAll(() => {
    MockedAxios = new MockAdapter(http);

    file = new File([readFileSync('./src/test/testImage.jpg')], 'testFile');
    largeFile = new File([readFileSync('./src/test/largeFile.mp4')], 'testFile');

    MockedAxios.onGet('/data').reply(200, [
      { name: 'John Doe', height: 100, file: 'file.png' },
      { name: 'Mark Ray', height: 121, file: 'file2.png' },
    ]);

    MockedAxios.onPost('/submit').reply(200, { uploadId: '123' });
    MockedAxios.onPost(route('/upload/:uploadId')).reply(200, { result: true });

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

  it('submit data', async () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    const nameInput = screen.getByTestId('name');
    const heightInput = screen.getByTestId('height');
    const fileInput = screen.getByTestId('upload');
    const submitButton = screen.getByTestId('submit-form');

    expect(nameInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(store.getState().general.status).not.toBe('initial');

    user.type(nameInput, 'Jenny Tiles');
    user.click(nameInput);
    user.type(heightInput, '400');
    user.click(heightInput);
    user.upload(fileInput, file);

    user.click(submitButton);
    expect(store.getState().general.status).toBe('working');
    await waitFor(() => expect(store.getState().general.status).toBe('success'));
  });

  it('form validation', async () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    const nameInput = screen.getByTestId('name');
    const heightInput = screen.getByTestId('height');
    const fileInput = screen.getByTestId('upload');
    const submitButton = screen.getByTestId('submit-form');

    //user
    user.type(nameInput, 'Jenny Tiles');
    user.click(nameInput);
    expect(screen.queryByText('Required')).toBeNull();
    user.type(
      nameInput,
      'm9y0MXb5Y9J6oLShtZ1B9UzjsrZPAfOpKnhfG5TT4Ygpbbffe7OuI01vGDwlERBCAa9buUz7zRjejbl6SVYdNsJfUW0JmVtSu3dN',
    );
    user.click(nameInput);
    expect(screen.queryByText('Name is too long')).toBeInTheDocument();
    fireEvent.change(nameInput.firstChild, { target: { value: '' } });
    user.click(heightInput);
    expect(screen.queryByText('Required, must be at least one character')).toBeInTheDocument();
    user.type(nameInput, 'Jenny Tiles');
    user.click(nameInput);
    expect(screen.queryByText('Required, must be at least one character')).not.toBeInTheDocument();
    expect(screen.queryByText('Name is too long')).not.toBeInTheDocument();

    //height
    user.type(nameInput, 'Jenny Tiles');
    user.click(nameInput);
    user.type(heightInput, '501');
    user.click(heightInput);
    expect(screen.queryByText('Must be 500 or less')).toBeInTheDocument();
    fireEvent.change(heightInput.firstChild, { target: { value: '' } });
    user.type(heightInput, '-1');
    user.click(heightInput);
    expect(screen.queryByText('Must be positive integer')).toBeInTheDocument();
    fireEvent.change(heightInput.firstChild, { target: { value: '' } });
    user.type(heightInput, '123');
    user.click(heightInput);
    expect(screen.queryByText('Must be 500 or less')).not.toBeInTheDocument();
    expect(screen.queryByText('Must be positive integer')).not.toBeInTheDocument();

    //file upload
    user.upload(fileInput, largeFile);
    user.click(heightInput);
    expect(screen.queryByText('File is too large')).toBeInTheDocument();
    user.upload(fileInput, file);
    user.click(heightInput);
    expect(screen.queryByText('File is too large')).not.toBeInTheDocument();
    user.click(heightInput);
    user.click(submitButton);
    expect(store.getState().general.status).toBe('working');
    await waitFor(() => expect(store.getState().general.status).toBe('success'));
  });
});
