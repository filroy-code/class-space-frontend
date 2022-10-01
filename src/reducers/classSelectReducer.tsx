export type SelectionData = {
  selectionType: "delete" | undefined;
  selectedClasses: string[];
};

export const INITIAL_STATE: SelectionData = {
  selectionType: undefined,
  selectedClasses: [],
};

export const classSelectReducer = (
  state: SelectionData,
  action: any
): SelectionData => {
  switch (action.type) {
    case "RESET":
      return {
        selectionType: undefined,
        selectedClasses: [],
      };

    case "DELETE_SELECT":
      return {
        selectionType: "delete",
        selectedClasses: [],
      };

    case "DELETE_SUBMIT":
      return { selectionType: "delete", selectedClasses: [] };
    default:
      return state;
  }
};
