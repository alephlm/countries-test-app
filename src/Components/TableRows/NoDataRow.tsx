import React from 'react';

const NoDataRow: React.FC = () => (
  <tr>
    <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
      No countries found
    </td>
  </tr>
);

export default NoDataRow;