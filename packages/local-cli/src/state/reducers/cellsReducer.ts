import produce from 'immer';
import { ActionType } from '../actionTypes';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const intialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = intialState, action: Action): CellsState => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;

    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell: Cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);
      state.loading = false;
      state.error = null;
      return state;

    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.MOVE_CELL:
      // we want to swap between the array positions of the two cells
      // if the direction is up, we want to move the cell up else we want to move it down
      const { direction } = action.payload;
      // find the index of the cell we want to move
      const index = state.order.findIndex((id) => id === action.payload.id);
      // find the index of the cell we want to swap with
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      // if the target index is less than 0 or greater than the length of the order array, we don't want to do anything
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      // swap the two cells
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex((id) => id === action.payload.id);
      if (foundIndex < 0) state.order.unshift(cell.id);
      else state.order.splice(foundIndex + 1, 0, cell.id);
      return state;
    default:
      return state;
  }
}, intialState);
const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
