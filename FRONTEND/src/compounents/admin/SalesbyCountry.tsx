import React from 'react';

const SalesByCountry = () => {
  return (
    <div className="bg-white p-4 rounded shadow-custom">
      <h4 className="text-xl font-semibold">Sales by Country</h4>
      <ul className="mt-4">
        <li className="mb-2">USA: <span className="font-semibold">$230,900</span></li>
        <li className="mb-2">Germany: <span className="font-semibold">$440,000</span></li>
        <li className="mb-2">Great Britain: <span className="font-semibold">$190,700</span></li>
        <li className="mb-2">Brazil: <span className="font-semibold">$143,960</span></li>
      </ul>
    </div>
  );
};

export default SalesByCountry;
