import React, { useEffect, useState } from 'react';
import { fetchVendors } from '../../../API/services/user/Services';
import { Pagination } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../../../compounents/user/Header';
import VendorsCard from '../../../compounents/user/VendorsCard';
import Footer from '../../../compounents/user/Footer';

interface Post {
  images: string;
  title?: string;
}

interface Licence {
  description: string;
}

interface Vendor {
  _id: string;
  vendorName: string;
  profilePicture: string;
  coverPicture: string;
  email: string;
  phoneNum?: string;
  posts: Post[];      
  registered: string;
  verified?: boolean;
  licence?: Licence[];
}


const Vendors: React.FC = () => {
  const { service } = useParams<{ service: string }>();
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

  const handlePageChange = (_event: React.ChangeEvent<unknown> | null, value: number) => {
    setPage(value);
  };


  return (
    <div className="min-h-screen bg-black">
      <main>
        <section className="relative">
          <Header />
          <img src="/user/pexels-mastercowley-1128782.jpg" alt="Wedding" className="w-full h-screen object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-8">
            <h3 className="text-3xl sm:text-5xl font-bold mb-4 text-center">We’re here for you from will you to I do.</h3>
            <p className="text-lg sm:text-xl mb-8 text-center">A wedding website & app that does more.</p>
          </div>
        </section>
        <section className="container mx-auto py-12   px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-black">Vendors</h3>
          <VendorsCard vendors={vendorsList} />
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
      <Footer />
    </div>
  );
};

export default React.memo(Vendors);
