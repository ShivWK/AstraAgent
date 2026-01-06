import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { TypedUseSelectorHook } from 'react-redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
