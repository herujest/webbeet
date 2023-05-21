import {TYPES} from '../actionTypes';

export type CategoryPropertyDTO =
  | 'TEXT'
  | 'CHECKBOX'
  | 'DATE'
  | 'NUMBER'
  | string;

export type ItemPropDTO = {
  id: string;
  value: string;
  type: CategoryPropertyDTO;
};

export type MainCategoryDTO = {
  id: string;
  name: string;
  properties: ItemPropDTO[];
  items?: any[];
};

type ProductInitState = {
  mainCategories: MainCategoryDTO[];
};

const initialState: ProductInitState = {
  mainCategories: [],
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case TYPES.PRODUCT.SET_CATEGORY:
      return {...state, mainCategories: [...state.mainCategories, payload]};
    case TYPES.PRODUCT.ADD_CATEGORY_ITEM:
      const modifiedMainCategories = state.mainCategories.map(
        (i: MainCategoryDTO) => {
          if (i.id === payload.id) {
            if (i?.items?.length) {
              i.items = [...(<[]>i.items), payload.data];
            } else {
              i.items = [payload.data];
            }
          }
          return i;
        },
      );

      return {...state, mainCategories: modifiedMainCategories};
    // return {...state, mainCategories: modifiedMainCategories};
    default:
      return state;
  }
};
