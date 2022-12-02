import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialSearchConfigState = {
  filtration: { filters: [] },
  sorting: { property: "default", direction: "default" },
};

const searchConfigSlice = createSlice({
  name: "searchConfig",
  initialState: initialSearchConfigState,
  reducers: {
    changeSorting(state, action) {
      state.sorting = { ...action.payload };
    },
    addFilter(state, action) {
      state.filtration.filters = [
        ...state.filtration.filters,
        { ...action.payload },
      ];
    },
    removeFilter(state, action) {
      state.filtration.filters = [...action.payload];
    },
  },
});

const initialAddPostState = {
  category: { value: null },
};
const addPostSlice = createSlice({
  name: "addPost",
  initialState: initialAddPostState,
  reducers: {
    changeCategory(state, action) {
      state.category = { ...action.payload };
      console.log({ ...action.payload });
    },
  },
});

const store = configureStore({
  reducer: {
    searchConfig: searchConfigSlice.reducer,
    addPost: addPostSlice.reducer,
  },
});

export const searchConfigActions = searchConfigSlice.actions;
export const addPostActions = addPostSlice.actions;
export default store;
