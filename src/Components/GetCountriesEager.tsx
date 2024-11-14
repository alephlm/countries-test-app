import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_COUNTRIES_QUERY } from "../GraphQL/Queries";
import Country from "../Types/Country";
import CountryFilterInput from "./CountryFilterInput";
import CountryTable from "./CountryTable";

export const GetCountriesEager: React.FC = () => {
  const [filter, setFilter] = useState('');
  const { loading, data, error } = useQuery(ALL_COUNTRIES_QUERY);

  const filteredCountries = data?.countries.filter((country: Country) =>
    country.code.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Countries EAGER List</h1>
      <CountryFilterInput filter={filter} setFilter={setFilter}/>
      <div className="flex mb-6 items-center justify-between">
        <h1 className="text-2xl font-bold mr-2">Countries</h1>
        <p className="text-sm">
          <a href="/getlazy" className="text-blue-600 hover:text-blue-800 underline hover:no-underline">
            LAZY
          </a> loading version of this page
        </p>
      </div>
      <CountryTable loading={loading} countries={filteredCountries} error={error} />
    </div>
  );
};