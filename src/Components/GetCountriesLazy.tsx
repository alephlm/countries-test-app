import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { COUNTRIES_QUERY } from "../GraphQL/Queries";
import { useDebounce } from "use-debounce";
import CountryFilterInput from "./CountryFilterInput";
import CountryTable from "./CountryTable";

export const GetCountriesLazy: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 200); // Debounce the filter input by 200ms

  const [loadCountries, { loading, data, error }] = useLazyQuery(COUNTRIES_QUERY);

  // Trigger the query when the debounced filter changes
  useEffect(() => {
    if (debouncedFilter) {
      loadCountries({ variables: { code: debouncedFilter.toUpperCase() } });
    }
  }, [debouncedFilter, loadCountries]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Countries LAZY List</h1>
      <CountryFilterInput filter={filter} setFilter={setFilter}/>
      <div className="flex mb-6 items-center justify-between">
        <h1 className="text-2xl font-bold mr-2">Countries</h1>
        <p className="text-sm">
          <a href="/" className="text-blue-600 hover:text-blue-800 underline hover:no-underline">
            EAGER
          </a> loading version of this page
        </p>
      </div>
      <CountryTable loading={loading} countries={data?.countries} error={error} />
    </div>
  );
};