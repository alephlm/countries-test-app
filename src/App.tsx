import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GetCountriesEager } from './Components/GetCountriesEager';
import { GetCountriesLazy } from './Components/GetCountriesLazy';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <BrowserRouter future={{v7_relativeSplatPath: true}}>
      <ApolloProvider client={client}>
        <div className="p-8 max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={ <GetCountriesEager /> } />
            <Route path="/getlazy" element={ <GetCountriesLazy /> } />
          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
