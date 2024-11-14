# Countries Explorer

This project is a React application that displays a list of countries and allows users to filter the countries based on their code. It consumes data from a public GraphQL API and uses modern frontend tools for styling and state management.

## Features

- Fetches country data from the GraphQL API at [https://countries.trevorblades.com/](https://countries.trevorblades.com/).
- Displays countries in a table format with two columns: country name and country code.
- Implements eager and lazy load methods in different pages
- Provides an input field to filter countries by code
- Lazy load version has 200ms input debounce to limit API requests.
- Styled using Tailwind CSS for a clean, modern look.

## Technology Choices

- **React**: Chosen for its component-based architecture, which allows for easy reuse and separation of concerns.
- **Apollo Client**: A popular GraphQL client that provides a straightforward way to manage data fetching from a GraphQL API and integrates well with React.
- **TypeScript**: Adds static typing to JavaScript, reducing runtime errors and improving code readability and maintainability.
- **Tailwind CSS**: A utility-first CSS framework that enables rapid styling directly in components without requiring additional CSS files.
- **use-debounce**: Handles debouncing the input field for filtering, limiting the number of API calls.
- **Jest**: A JavaScript testing framework used to write and run test cases, ensuring the app’s functionality and reliability.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alephlm/countries-test-app
   cd countries-test-app
2. Run the application
   ```bash
   npm start
3. Application will be accesible at [http://localhost:3000](http://localhost:3000).

### Testing
1. Run test script with:
   ```bash
   npm test