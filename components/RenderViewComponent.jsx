"use client";

import { Fragment } from "react";
import { ViewComponentProvider } from "./ViewComponentProvider";
import Watermark from "./Watermark";
import { viewComponentsRender } from "./view-component-map";
import WrapperViewComponent from "./WrapperViewComponent";
import ContainerWrapper from "./view/ContainerWrapper";
import ViewPopup from "./ViewPopup";
import { generateId } from "@/lib/utils";

const RenderViewComponent = ({ publishData }) => {
  const frameGlobalOptions = publishData?.globalOptions;
  const { bgColor } = frameGlobalOptions || {};

  const rootComponents =
    publishData?.pages[0].frames?.[0]?.component?.components;

  const renderComponents = (comp, key) => {
    const type = comp.type;

    const Component = viewComponentsRender[type];
    const isFloatingComponent = type?.toLowerCase().startsWith("floating-");
    const isPopupComponent = type?.toLowerCase().startsWith("popup-");

    const containerWrapper = type === "container-wrapper";

    if (!Component) return null;

    return (
      <Fragment key={key}>
        {isPopupComponent ? (
          <ViewPopup
            popupId={comp?.attributes?.id}
            popupContent={comp?.components[0]}
            frameGlobalOptions={frameGlobalOptions}
            viewComponentsRender={viewComponentsRender}
          />
        ) : containerWrapper ? (
          <ContainerWrapper
            container={comp.components[0]}
            frameGlobalOptions={frameGlobalOptions}
            viewComponentsRender={viewComponentsRender}
          />
        ) : (
          <WrapperViewComponent
            key={key || comp.attributes?.id}
            ViewComponent={Component}
            section={comp.customComponent}
            buildContainerStyle={frameGlobalOptions}
            isFloatingComponent={isFloatingComponent}
            isPopupComponent={isPopupComponent}
          />
        )}
      </Fragment>
    );
  };

  return (
    <ViewComponentProvider initialPopups={publishData?.popups}>
      <div
        style={{
          backgroundColor: bgColor || "white",
        }}
        className="min-h-screen flex flex-col mx-auto"
      >
        <main className="flex-1">
          {rootComponents?.map((comp) =>
            renderComponents(comp, comp.attributes?.id || generateId())
          )}
        </main>
        {frameGlobalOptions?.watermark && <Watermark />}
      </div>
    </ViewComponentProvider>
  );
};

export default RenderViewComponent;
