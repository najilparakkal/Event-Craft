import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { updateUserDetails } from '../API/services/user/authSlice';
import { updateVendorDetails } from '../API/services/vendor/aurhSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




export const useUpdateUserDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (updatedDetails: Partial<UserDetails>) => {
    dispatch(updateUserDetails(updatedDetails));
  };
};  

export const useUpdateVendorDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (updatedDetails: Partial<VendorDetails>) => {
    dispatch(updateVendorDetails(updatedDetails));
  };
};
