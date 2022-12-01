import { createStore } from "redux";

const reducer = (
  state = {
    filtration: {
      filters: [],
    },
    sorting: { sortBy: "default", direction: "default" },
  },
  action
) => {
  if (action.type === "addFilter") {
    return {
      filtration: {
        filters: [...state.filtration.filters, { ...action.filterBy }],
      },
    };
  }

  if (action.type === "removeFilter") {
    return {
      filtration: {
        filters: [...action.filterBy],
      },
    };
  }

  if (action.type === "changeSorting") {
    return {
      sorting: { sortBy: { ...action.sortBy } },
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
