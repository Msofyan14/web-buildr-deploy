"use client";

import { cn, generateId } from "@/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSafePopupContext } from "./ViewComponentProvider";
import ContainerWrapper, { convertStyleToReact } from "./ContainerWrapper";
import WrapperViewComponent from "./WrapperViewComponent";

const ViewPopup = ({
  popupId,
  popupContent,
  frameGlobalOptions,
  viewComponentsRender,
}) => {
  const { popupsPublishMode } = useSafePopupContext() || {};
  const [showModal, setShowModal] = useState("none");

  const { typeOpen, delayDuration, wrapperStyle } =
    popupContent?.customComponent || {};

  const style = convertStyleToReact(wrapperStyle || {});

  const { backgroundColor, borderRadius, maxHeight, minHeight, width } = style;

  useEffect(() => {
    if (typeOpen === "immediately") {
      setShowModal("flex");
    } else if (typeOpen === "delay" && delayDuration) {
      setTimeout(() => {
        setShowModal("flex");
      }, delayDuration);
    } else if (typeOpen === "onClick" && popupsPublishMode.length > 0) {
      // const selectedPopup = popups.find((popup) => popup.popupId === popupId);
      const selectedPopup = popupsPublishMode.find(
        (popup) => popup.popupId === popupId
      );
      if (selectedPopup?.isShown) {
        setShowModal("flex");
      }
    }
  }, [delayDuration, popupId, typeOpen, popupsPublishMode]);

  const handleClose = () => {
    if (typeOpen === "onClick" && popupsPublishMode.length > 0) {
      setShowModal("none");
    } else {
      setShowModal("none");
    }
  };

  const renderPopupContens = (comp) => {
    const type = comp.type;

    const Component =
      type === "modal-wrapper" ? null : viewComponentsRender[type];
    const isFloatingComponent = type?.toLowerCase().startsWith("floating-");
    const isPopupComponent = type?.toLowerCase().startsWith("popup-");

    if (!Component) return null;

    return (
      <WrapperViewComponent
        key={generateId()}
        ViewComponent={Component}
        editor={null}
        section={comp.customComponent}
        childrenModels={null}
        buildContainerStyle={frameGlobalOptions}
        buildChildComponents={null}
        isFloatingComponent={isFloatingComponent}
        isPopupComponent={isPopupComponent}
      />
    );
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        display: showModal,
      }}
      className={cn(
        "fixed inset-0 z-[9999]  items-center justify-center bg-black/50 transition-opacity duration-200"
      )}
    >
      <div
        style={{
          backgroundColor,
          position: "relative",
          width,
          borderRadius,
          padding: "40px",
        }}
        className={clsx("transition-all duration-200", "")}
      >
        <IoCloseSharp
          onClick={handleClose}
          style={{
            right: 10,
            top: 10,
          }}
          className="absolute  text-muted-foreground cursor-pointer hover:scale-110 transition-all ease-out z-50   "
          size={28}
        />

        <div
          style={{
            minHeight,
            maxHeight,
            overflowY: "auto",
          }}
        >
          {popupContent?.components?.map((comp) => {
            const containerWrapper = comp?.type === "container-wrapper";

            if (containerWrapper) {
              return (
                <ContainerWrapper
                  key={comp?.attributes?.id}
                  container={comp.components[0]}
                  frameGlobalOptions={frameGlobalOptions}
                  viewComponentsRender={viewComponentsRender}
                />
              );
            } else {
              return renderPopupContens(comp);
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewPopup;
