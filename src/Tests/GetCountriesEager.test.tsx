import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ALL_COUNTRIES_QUERY } from "../GraphQL/Queries";
import { GetCountriesEager } from "../Components/GetCountriesEager";

// Mock data for the countries query
const countriesMockData = [
  {
    code: "EE",
    name: "Estonia"
  },
  {
    code: "BR",
    name: "Brazil"
  },
  {
    code: "IN",
    name: "India"
  }
];

// Mock GraphQL query response
const mocks = [
  {
    request: {
      query: ALL_COUNTRIES_QUERY
    },
    result: {
      data: {
        countries: countriesMockData
      }
    }
  }
];

describe("GetCountriesEager", () => {
  it("displays an error message when there's an error", async () => {
    const errorMock = [
      {
        request: {
          query: ALL_COUNTRIES_QUERY
        },
        error: new Error("An error occurred")
      }
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <GetCountriesEager />
      </MockedProvider>
    );

    // Wait for error message to appear
    await screen.findByText(/Error: An error occurred/i);
  });

  it("displays countries data correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GetCountriesEager />
      </MockedProvider>
    );

    // Wait for the countries to load and check the country names
    await screen.findByText("Estonia");
    expect(screen.getByText("Estonia")).toBeInTheDocument();
    
    await screen.findByText("Brazil");
    expect(screen.getByText("Brazil")).toBeInTheDocument();
    
    await screen.findByText("India");
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  it("filters countries by country code", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GetCountriesEager />
      </MockedProvider>
    );

    // Wait for countries to load
    await screen.findByText("Estonia");
    expect(screen.getByText("Estonia")).toBeInTheDocument();
    
    await screen.findByText("Brazil");
    expect(screen.getByText("Brazil")).toBeInTheDocument();
    
    await screen.findByText("India");
    expect(screen.getByText("India")).toBeInTheDocument();

    // Find the filter input and type a filter
    const input = screen.getByPlaceholderText('Filter by country code');
    fireEvent.change(input, { target: { value: "ee" } });

    await screen.findByText("Estonia")
    // Ensure other countries are not displayed
    await waitFor(() => expect(screen.queryByText("Brazil")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("India")).not.toBeInTheDocument());
  });

  it("shows no results for non-matching filter", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GetCountriesEager />
      </MockedProvider>
    );

    // Wait for countries to load
    await screen.findByText("Estonia");
    expect(screen.getByText("Estonia")).toBeInTheDocument();

    // Simulate a filter that does not match any country
    const input = screen.getByPlaceholderText('Filter by country code');
    fireEvent.change(input, { target: { value: "abc" } });

    // Wait for filter to take effect and ensure no country is displayed
    await waitFor(() => expect(screen.queryByText("Estonia")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("Brazil")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("India")).not.toBeInTheDocument());
  });
});
