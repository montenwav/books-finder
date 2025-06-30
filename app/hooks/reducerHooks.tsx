import { useDispatch, useStore, useSelector, TypedUseSelectorHook } from 'react-redux'
import {RootState, AppDispatch} from '../Reducer'
import {store} from '../Reducer'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => typeof store = useStore 