// ?: What are the actions here ?
// Actions are just functions responsible for making change to any state that can be accessed by tableStore.
// Actions return an anonymous function which will be called in the reducer function of tableContext's useReducer hook

import { getColumns } from "../../utils/getColumns";

// This Action is dispatched every time an API call is made
// This Action is responsible for setting the customerData, the dashBoardData and the givenFields....
export const Action_SetData = (data) => {
  return (state) => {
    const columns = getColumns(Object.keys(data.customerData[0] ?? {}));
    return {
      ...state,
      customerData: data.customerData,
      dashboardData: data.dashboardData,
      currentPage: 1,
      selectedFields: columns,
    };
  };
};
// This action is responsible for selecting the fields to show data in table (I'm not currently using it)
export const Action_SetFields = (fields) => {
  return (state) => {
    return { ...state, selectedFields: fields };
  };
};
export const Action_SetManager = (managerId) => {
  return (state) => {
    return { ...state, currentManagerId: managerId };
  };
};
export const Action_SetPage = (pageNo) => {
  return (state) => {
    return { ...state, currentPage: pageNo };
  };
};
export const Action_SetTotalPages = (totalPages) => {
  return (state) => {
    return { ...state, totalPages: totalPages };
  };
};

export const Action_SetRecords = (records) => {
  return (state) => {
    const totalPages = Math.ceil(state.customerData.length / records);
    const currentPage =
      totalPages < state.currentPage ? totalPages : state.currentPage;
    return { ...state, records, totalPages, currentPage };
  };
};

// for sorting the table
export const Action_SortData = (sortField, sortOrder) => {
  // tabledata and settable data cme start state
  return (state) => {
    if (!sortField) return state;
    const customerData = state.customerData.sort((a, b) => {
      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    return { ...state, customerData };
  };
};
// Handling what happens when someone clicks on a dropdown option
// takes the the clicked filed and toggles it's hidden state,
// if a field has hidden state set to true it will not render on the table
export const Action_ToggleField = (givenfield) => {
  return (state) => {
    if (!givenfield.hidden) {
      const selectedFields = state.selectedFields.map((e) =>
        e.key === givenfield.key ? { ...e, hidden: true } : e
      );
      return { ...state, selectedFields };
    } else {
      const selectedFields = state.selectedFields.map((e) =>
        e.key === givenfield.key ? { ...e, hidden: false } : e
      );
      return { ...state, selectedFields };
    }
  };
};
// needs a boolean state to know if all fields are selected or not
// just toggles what was the last value

export const Action_ToggleSelectAll = (selected) => {
  return (state) => {
    if (selected) {
      const selectedFields = state.selectedFields.map((e) => {
        return { ...e, hidden: false };
      });
      return { ...state, selectedFields };
    } else {
      const selectedFields = state.selectedFields.map((e) => {
        return { ...e, hidden: true };
      });
      return { ...state, selectedFields };
    }
  };
};
