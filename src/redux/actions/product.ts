import {TYPES} from '../actionTypes';

export const setCategory = (payload: any) => ({
  type: TYPES.CATEGORY.SET_CATEGORY,
  payload,
});
