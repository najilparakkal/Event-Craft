import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { updateUserDetails } from '../API/services/user/authSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUpdateUserDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (updatedDetails: Partial<UserDetails>) => {
    dispatch(updateUserDetails(updatedDetails));
  };
};
