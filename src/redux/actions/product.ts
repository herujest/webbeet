import {TYPES} from '../actionTypes';

export const setCategoryTitleField = (payload: any) => ({
  type: TYPES.PRODUCT.SET_CATEGORY_TITLE_FIELD,
  payload,
});

export const setCategory = (payload: any) => ({
  type: TYPES.PRODUCT.SET_CATEGORY,
  payload,
});

export const deleteCategory = (categoryId: string) => ({
  type: TYPES.PRODUCT.DELETE_CATEGORY,
  payload: categoryId,
});

export const editCategory = (categoryId: string, updatedValue: any) => ({
  type: TYPES.PRODUCT.EDIT_CATEGORY,
  payload: {id: categoryId, data: updatedValue},
});

export const addCategoryItem = (categoryId: number, payload: any) => ({
  type: TYPES.PRODUCT.ADD_CATEGORY_ITEM,
  payload: {id: categoryId, data: payload},
});

export const deleteCategoryItem = (
  categoryId: string,
  categoryItemId: string,
) => ({
  type: TYPES.PRODUCT.DELETE_CATEGORY_ITEM,
  payload: {categoryId, categoryItemId},
});
