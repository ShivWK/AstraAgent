import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
