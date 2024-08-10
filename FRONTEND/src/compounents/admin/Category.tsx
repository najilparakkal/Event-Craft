import React from 'react';

const Category:React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow-custom">
      <h4 className="text-xl font-semibold">Category</h4>
      <ul className="mt-4">
        <li className="mb-2">Devices: <span className="font-semibold">250 in stock, 346+ sold</span></li>
        <li className="mb-2">Tickets: <span className="font-semibold">123 closed, 15 open</span></li>
        <li className="mb-2">Error logs: <span className="font-semibold">1 active, 40 closed</span></li>
        <li className="mb-2">Happy users: <span className="font-semibold">+430</span></li>
      </ul>
    </div>
  );
};

export default React.memo(Category);
