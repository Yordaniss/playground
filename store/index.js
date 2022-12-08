import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialSearchConfigState = {
  // filtration: { filters: [] },
  filtration: { title: "", main_category: "", components: [] },
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
      // state.filtration.filters = [...action.payload];
      state.filtration = { ...action.payload };
    },
  },
});

const initialAddPostState = {
  category: null,
  age: { value: null },
  touchedFields: [],
};
const addPostSlice = createSlice({
  name: "addPost",
  initialState: initialAddPostState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    changeAge(state, action) {
      state.age = action.payload;
    },
    addTouchedField(state, action) {
      state.touchedFields = [...state.touchedFields, action.payload];
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
