import cellsReducer from './cellsReducer';
import bundleReducer from './bundelsReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
