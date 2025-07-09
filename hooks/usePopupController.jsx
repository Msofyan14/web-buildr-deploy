import { useSafePopupContext } from "@/components/ViewComponentProvider";

export const usePopupController = () => {
  const context = useSafePopupContext();

  const togglePopup = (popupId, value) => {
    if (context && context.togglePopupPublishMode) {
      context.togglePopupPublishMode(popupId, value);
    }
  };

  return { togglePopup };
};
