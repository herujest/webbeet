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
  name: string;
  properties: ItemPropDTO[];
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
    case TYPES.CATEGORY.SET_CATEGORY:
      return {...state, mainCategories: [...state.mainCategories, ...payload]};

    default:
      return state;
  }
};
