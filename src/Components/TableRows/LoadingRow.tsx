import React from 'react';

const LoadingRow: React.FC = () => (
  <tr>
    <td colSpan={2} className="px-4 py-4 text-center text-gray-500 animate-pulse">
      Loading...
    </td>
  </tr>
);

export default LoadingRow;
