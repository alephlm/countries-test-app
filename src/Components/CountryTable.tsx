import React from 'react';
import LoadingRow from './TableRows/LoadingRow';
import CountryRow from './TableRows/CountryRow';
import NoDataRow from './TableRows/NoDataRow';
import Country from '../Types/Country';

interface CountryTableProps {
  loading: boolean;
  countries: Country[];
  error: any;
}

const CountryTable: React.FC<CountryTableProps> = ({ loading, countries, error }) => (
  <div className="rounded-lg shadow-lg">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b font-semibold text-left text-gray-700">Country Name</th>
          <th className="px-4 py-2 border-b font-semibold text-left text-gray-700">Country Code</th>
        </tr>
      </thead>
      <tbody>
        {loading && <LoadingRow />}
        {countries?.map((country: Country) => (
          <CountryRow key={country.code} country={country} />
        ))}
        {!loading && countries?.length === 0 && <NoDataRow />}
        {error && <tr><td colSpan={2} className="px-4 py-4 text-center text-red-500">Error loading countries</td></tr>}
      </tbody>
    </table>
  </div>
);

export default CountryTable;
