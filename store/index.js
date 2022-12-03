import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialSearchConfigState = {
  filtration: { filters: [] },
  sorting: { property: "default", direction: "default" },
};

const searchConfigSlice = createSlice({
  name: "searchConfig",
  initialState: initialSearchConfigState,
  reducers: {
    setSorting(state, action) {
      state.sorting = { ...action.payload };
    },
    setFilters(state, action) {
      state.filtration.filters = [...action.payload];
    },
  },
});

const initialAddPostState = {
  categories: [],
  age: { value: null },
};
const addPostSlice = createSlice({
  name: "addPost",
  initialState: initialAddPostState,
  reducers: {
    setCategories(state, action) {
      state.categories = [...action.payload];
    },
    changeAge(state, action) {
      state.age = action.payload;
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
