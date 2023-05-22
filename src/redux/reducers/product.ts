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
  title?: string;
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
    case TYPES.PRODUCT.DELETE_CATEGORY:
      const indexCtgr = state.mainCategories.findIndex(i => i.id === payload);
      const updatedCategories = [
        ...state.mainCategories.slice(0, indexCtgr),
        ...state.mainCategories.slice(indexCtgr + 1),
      ];

      return {...state, mainCategories: updatedCategories};
    case TYPES.PRODUCT.EDIT_CATEGORY:
      const modifiedData = state.mainCategories.map(i => {
        if (i.id === payload.id) {
          i.name = payload.data?.name;
          i.properties = payload?.data?.properties;
          i.title = payload.data?.title;
        }
        return i;
      });

      return {
        ...state,
        mainCategories: modifiedData,
      };
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
