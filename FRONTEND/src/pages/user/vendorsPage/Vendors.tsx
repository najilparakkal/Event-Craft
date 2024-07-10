import React, { useEffect, useState } from 'react';
import { fetchVendors } from '../../../API/services/user/Services';
import { Pagination } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../compounents/user/Header';

interface Vendor {
  _id: string;
  vendorName: string;
  email: string;
  profilePicture: string;
}

const Vendors: React.FC = () => {
  const { service } = useParams<{ service: string }>();
  const navigate = useNavigate();
  const [vendorsList, setVendorsList] = useState<Vendor[]>([]);
  const [page, setPage] = useState(1);
  const vendorsPerPage = 9;

  useEffect(() => {
    const vendors = async () => {
      if (service) {
        const list: Vendor[] = await fetchVendors(service);
        setVendorsList(list);
      }
    };
    vendors();
  }, [service]);

  const handlePageChange = (event: React.ChangeEvent<unknown> | null, value: number) => {
    setPage(value);
  };

  const paginatedVendors = vendorsList.slice((page - 1) * vendorsPerPage, page * vendorsPerPage);

  return (
    <div className="min-h-screen">
      <main>
        <section className="relative">
          <Header />
          <img src="/user/pexels-mastercowley-1128782.jpg" alt="Wedding" className="w-full h-[450px] sm:h-[550px] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-8">
            <h3 className="text-3xl sm:text-5xl font-bold mb-4 text-center">We’re here for you from will you to I do.</h3>
            <p className="text-lg sm:text-xl mb-8 text-center">A wedding website & app that does more.</p>
            <button className="bg-green-500 text-white px-6 py-3 rounded-md">Get Started</button>
          </div>
        </section>

        <section className="container mx-auto py-12 px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-black">Vendors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedVendors.map((vendor) => (
              <div key={vendor._id} className="p-1 shadow-md text-center">
                <img
                  onClick={() => navigate(`/vendorProfile/${vendor._id}`)}
                  src={vendor.profilePicture}
                  alt={vendor.vendorName}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              count={Math.ceil(vendorsList.length / vendorsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(Vendors);
