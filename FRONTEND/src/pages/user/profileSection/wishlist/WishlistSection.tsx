import React from 'react';
import LikedPost from './LikedPost';
import LikedVendor from './LikedVendor';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { buttonClasses } from '@mui/base/Button';
import Notification from '../../../../compounents/user/Notification';
import Header from '../../../../compounents/user/Header';

const WishlistSection: React.FC = () => {
  const { _id } = useAppSelector((state) => state.user.userDetails);

  return (
    <div className="w-full bg-black min-h-screen flex flex-col">
      <Header />
      <Notification />
      <div className="flex flex-grow w-full flex-col justify-center items-center">
        <Tabs defaultValue={1} className="w-full px-4">
          <TabsList>
            <Tab value={1}>Liked Posts</Tab>
            <Tab value={2}>Liked Vendors</Tab>
          </TabsList>
          <TabPanel value={1}>
            <LikedPost userId={_id + ""} />
          </TabPanel>
          <TabPanel value={2}>
            <LikedVendor userId={_id + ""} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default WishlistSection;

const Tabs = BaseTabs;

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: auto;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 6px 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 5px 8px;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const TabsList = styled(BaseTabsList)`
  width: 100%;
  background-color: transparent;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: 50px; 
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 40px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    margin-top: 30px;
  }
`;
