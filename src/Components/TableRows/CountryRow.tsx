import React from 'react';
import Country from '../../Types/Country';

interface CountryRowProps {
  country: Country;
}

const CountryRow: React.FC<CountryRowProps> = ({ country }) => (
  <tr className="transform transition duration-300 
                                    ease-in-out hover:scale-105 hover:shadow-lg
                                    hover:z-10 hover:bg-blue-50 relative">
    <td className="px-4 py-2 border-b text-gray-800">{country.name}</td>
    <td className="px-4 py-2 border-b text-gray-800">{country.code}</td>
  </tr>
);

export default CountryRow;
