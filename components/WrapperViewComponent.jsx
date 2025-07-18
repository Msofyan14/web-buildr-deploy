"use client";

import ContainerView from "./ContainerView";

const WrapperViewComponent = ({
  ViewComponent,
  section,
  buildContainerStyle,
  isFloatingComponent,
  isPopupComponent,
  isNavbarComponent,
}) => {
  const currentGlobalOptions = buildContainerStyle;

  const { isFocusContent, maxWidthPage } = currentGlobalOptions || {};

  return (
    <>
      {isFloatingComponent || isPopupComponent ? (
        <ViewComponent
          section={section}
          maxWidthPage={maxWidthPage}
          isFocusContent={isFocusContent}
          buildContainerStyle={buildContainerStyle}
        />
      ) : (
        <ContainerView
          targetId={section?.scrollTarget?.value || ""}
          section={section}
          maxWidthPage={maxWidthPage}
          isNavbarComponent={isNavbarComponent}
        >
          <ViewComponent
            section={section}
            maxWidthPage={maxWidthPage}
            isFocusContent={isFocusContent}
            buildContainerStyle={buildContainerStyle}
          />
        </ContainerView>
      )}
    </>
  );
};

export default WrapperViewComponent;
