import { usePopupController } from "./usePopupController";

export const useActionClickTarget = () => {
  const { togglePopup } = usePopupController();

  const onActionClickTarget = (target) => {
    if (
      target?.actionType === "link" &&
      target?.options?.type === "url" &&
      target?.options?.link
    ) {
      window.open(
        target.options?.link,
        target.options?.isOpenNewTab ? "_blank" : "_self",
        target.options?.isOpenNewTab ? "noopener noreferrer" : ""
      );
    } else if (
      target?.actionType === "link" &&
      target?.options?.type === "whatsapp" &&
      target?.options?.phoneNumber
    ) {
      const waLink = `https://wa.me/+62${
        target.options?.phoneNumber
      }?text=${encodeURIComponent(target?.options?.message)}`;
      window.open(
        waLink,
        target.options?.isOpenNewTab ? "_blank" : "_self",
        target.options?.isOpenNewTab ? "noopener noreferrer" : ""
      );
    } else if (
      target?.actionType === "action" &&
      target?.options?.type === "scrollTarget" &&
      target?.options?.value
    ) {
      const targetId = target?.options?.value;

      const iframe = document.querySelector(".gjs-frame");

      {
        if (targetId === "scrollToTop") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
        }
      }
    } else if (
      target?.actionType === "popup" &&
      target?.options?.type === "popup" &&
      target?.options?.value
    ) {
      // ✅ Gunakan usePopupController
      togglePopup(target?.options?.value, true);
    }
  };

  return { onActionClickTarget };
};
