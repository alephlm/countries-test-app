import React from 'react';

interface CountryFilterInputProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const CountryFilterInput: React.FC<CountryFilterInputProps> = ({ filter, setFilter }) => (
  <input
    type="text"
    placeholder="Filter by country code"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="p-2 border border-gray-300 rounded mb-4 w-full"
  />
);

export default CountryFilterInput;