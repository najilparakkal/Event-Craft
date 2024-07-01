
const Sales = () => {
  return (
    <div className="bg-white p-4 rounded shadow-custom">
      <h4 className="text-xl font-semibold">Sales Overview</h4>
      <div className="mt-4">
        <p className="text-green-500">4% more in 2021</p>
        <div className="h-64 bg-secondary rounded mt-4"> {/* Replace with actual chart component */} </div>
      </div>
    </div>
  );
};

export default Sales;
