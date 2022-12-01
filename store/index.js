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

const store = configureStore({
  reducer: { searchConfig: searchConfigSlice.reducer },
});

export const searchConfigActions = searchConfigSlice.actions;

export default store;
