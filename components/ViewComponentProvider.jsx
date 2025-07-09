import { createContext, useContext, useState } from "react";

const PopupContext = createContext(undefined);

export const ViewComponentProvider = ({ children, initialPopups = [] }) => {
  const [popupsPublishMode, setPopupPublishMode] = useState(initialPopups);

  const togglePopupPublishMode = (popupId, value) => {
    setPopupPublishMode((prev) =>
      prev.map((popup) =>
        popup.popupId === popupId ? { ...popup, isShown: value } : popup
      )
    );
  };

  return (
    <PopupContext.Provider
      value={{ popupsPublishMode, togglePopupPublishMode }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const useSafePopupContext = () => {
  try {
    return useContext(PopupContext);
  } catch {
    return null;
  }
};
