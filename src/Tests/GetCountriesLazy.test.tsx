import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { COUNTRIES_QUERY } from '../GraphQL/Queries';
import { GetCountriesLazy } from '../Components/GetCountriesLazy';

// Mock data for testing
const mockCountriesData = {
  request: {
    query: COUNTRIES_QUERY,
    variables: { code: 'EE' },
  },
  result: {
    data: {
      countries: [
        { code: 'EE', name: 'Estonia' },
        { code: 'BR', name: 'Brazil' },
      ],
    },
  },
};

const mockErrorData = {
  request: {
    query: COUNTRIES_QUERY,
    variables: { code: 'INVALID' },
  },
  error: new Error('GraphQL Error'),
};

describe('<GetCountriesLazy /> Route Tests', () => {
  it('renders the component at the /getlazy route', () => {
    render(
      <MockedProvider mocks={[mockCountriesData]} addTypename={false}>
        <MemoryRouter initialEntries={['/getlazy']}>
          <Routes>
            <Route path="/getlazy" element={<GetCountriesLazy />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
    
    expect(screen.getByText('Countries LAZY List')).toBeInTheDocument();
  });

  it('triggers a query and displays data when filter is entered', async () => {
    render(
      <MockedProvider mocks={[mockCountriesData]} addTypename={false}>
        <MemoryRouter initialEntries={['/getlazy']}>
          <Routes>
            <Route path="/getlazy" element={<GetCountriesLazy />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Filter by country code');

    // Simulate typing "ee" and triggering the debounced query
    fireEvent.change(input, { target: { value: 'ee' } });

    expect(await screen.findByText('Estonia')).toBeInTheDocument();
  });

  it('displays an error message when the query fails', async () => {
    render(
      <MockedProvider mocks={[mockErrorData]} addTypename={false}>
        <MemoryRouter initialEntries={['/getlazy']}>
          <Routes>
            <Route path="/getlazy" element={<GetCountriesLazy />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Filter by country code');

    // Simulate entering an invalid filter value
    fireEvent.change(input, { target: { value: 'invalid' } });
    await screen.findByText(/Error:/);
  });

  it('renders an empty table when no countries are returned', async () => {
    const emptyDataMock = {
      request: {
        query: COUNTRIES_QUERY,
        variables: { code: 'ZZ' },
      },
      result: {
        data: { countries: [] },
      },
    };

    render(
      <MockedProvider mocks={[emptyDataMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/getlazy']}>
          <Routes>
            <Route path="/getlazy" element={<GetCountriesLazy />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Filter by country code');
    fireEvent.change(input, { target: { value: 'ZZ' } });

    expect(await screen.findByText('No countries found')).toBeInTheDocument();
  });
});
