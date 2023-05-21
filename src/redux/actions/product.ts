import {TYPES} from '../actionTypes';

export const setCategory = (payload: any) => ({
  type: TYPES.PRODUCT.SET_CATEGORY,
  payload,
});
