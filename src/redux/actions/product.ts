import {TYPES} from '../actionTypes';

export const setCategory = (payload: any) => ({
  type: TYPES.PRODUCT.SET_CATEGORY,
  payload,
});

export const deleteCategory = (categoryId: string) => ({
  type: TYPES.PRODUCT.DELETE_CATEGORY,
  payload: categoryId,
});

export const addCategoryItem = (categoryId: number, payload: any) => ({
  type: TYPES.PRODUCT.ADD_CATEGORY_ITEM,
  payload: {id: categoryId, data: payload},
});
