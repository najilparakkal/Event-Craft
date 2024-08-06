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
import ProfileHeader from '../../../../compounents/user/ProfileHeader';
import Notification from '../../../../compounents/user/Notification';

const WishlistSection: React.FC = () => {
  const { _id } = useAppSelector((state) => state.user.userDetails);

  return (
    <div className="w-full">
      <ProfileHeader />
      <Notification/>

      <div className="flex width-full flex-col">
        <Tabs defaultValue={1}>
          <TabsList>
            <Tab value={1}>Liked Posts</Tab>
            <Tab value={2}>Liked Vendors</Tab>
          </TabsList>
          <TabPanel value={1}>
            <LikedPost userId={_id + ""} />
          </TabPanel>
          <TabPanel value={2}>
            <LikedVendor userId={_id+""}/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default WishlistSection;

// Styled Components
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
  width: 100%;
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
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)`
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;
