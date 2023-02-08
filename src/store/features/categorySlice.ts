import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '../../Types/ManageCategory';

const initialState: CategoryState = {
  category: [],
};

interface UpdateInputFieldsPayload {
  index: number;
  inputIndex?: number;
  data: any;
}

interface UpdateCategoryPayload {
  index: number;
  data: any;
}

const updateCategory = (
  state: CategoryState,
  payload: UpdateCategoryPayload,
  key: string
) => {
  state.category[payload.index][key] = payload.data;
};

const updateInputFields = (
  state: CategoryState,
  payload: UpdateInputFieldsPayload,
  operation: string
) => {
  switch (operation) {
    case 'add':
      state.category[payload.index].inputFields.push(payload.data);
      break;
    case 'delete':
      state.category[payload.index].inputFields = state.category[
        payload.index
      ].inputFields.splice(payload.inputIndex!, 1);
      break;
    default:
      state.category[payload.index].inputFields = payload.data;
  }
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<any>) => {
      state.category.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.category = state.category.filter(
        (item) => item.id !== action.payload
      );
    },
    updateInputFieldsValue: (
      state,
      action: PayloadAction<UpdateInputFieldsPayload>
    ) => {
      updateInputFields(state, action.payload, 'update');
    },
    addInputFields: (
      state,
      action: PayloadAction<UpdateInputFieldsPayload>
    ) => {
      updateInputFields(state, action.payload, 'add');
    },
    deleteInputFields: (
      state,
      action: PayloadAction<UpdateInputFieldsPayload>
    ) => {
      updateInputFields(state, action.payload, 'delete');
    },
    updateSelectedTitle: (
      state,
      action: PayloadAction<UpdateCategoryPayload>
    ) => {
      updateCategory(state, action.payload, 'titleSelected');
    },
    updateCategoryName: (
      state,
      action: PayloadAction<UpdateCategoryPayload>
    ) => {
      updateCategory(state, action.payload, 'name');
    },
    resetCategory: (state) => {
      state.category = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCategory,
  deleteCategory,
  resetCategory,
  updateInputFieldsValue,
  addInputFields,
  deleteInputFields,
  updateSelectedTitle,
  updateCategoryName,
} = categorySlice.actions;

export default categorySlice.reducer;
