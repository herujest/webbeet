import {TYPES} from '../actionTypes';

export const setCategory = (payload: any) => ({
  type: TYPES.PRODUCT.SET_CATEGORY,
  payload,
});

export const addCategoryItem = (categoryId: number, payload: any) => ({
  type: TYPES.PRODUCT.ADD_CATEGORY_ITEM,
  payload: {id: categoryId, data: payload},
});
