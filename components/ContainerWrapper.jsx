import { useViewport } from "@/hooks/useViewport";
import { generateId } from "@/lib/utils";
import WrapperViewComponent from "./WrapperViewComponent";
import { WaveShape } from "./WaveShape";
import { MultiWaveShape } from "./MultiWaveShape";

export function convertStyleToReact(styleObj) {
  const newStyle = {};
  for (const key in styleObj) {
    const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    newStyle[camelKey] = styleObj[key];
  }
  return newStyle;
}

export function getBackgroundStyles(content) {
  if (!content) return null;

  const backgroundImgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: content?.background?.bgImage
      ? `url(${content?.background?.bgImage})`
      : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: `blur(${content?.background?.blur}px)`,
    overflow: "hidden",
  };

  const calculateOpacity = content?.background?.opacity / 100;

  const gradientStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundImage: `linear-gradient(${content?.background?.direction}, ${
      content?.background?.isRevert
        ? content?.background?.toColor
        : content?.background?.fromColor
    }, ${
      content?.background?.isRevert
        ? content?.background?.fromColor
        : content?.background?.toColor
    })`,
  };

  const backgroundPatternStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: content?.background?.pattern
      ? `url(${content?.background?.pattern})`
      : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  };

  return {
    backgroundImgStyle,
    calculateOpacity,
    gradientStyle,
    backgroundPatternStyle,
  };
}

const ContainerWrapper = ({
  container,
  frameGlobalOptions,
  viewComponentsRender,
}) => {
  const {
    shape,
    marginTop,
    marginBottom,
    rounded,
    isFullWidth,
    bgType,
    bgColor,
    opacity,
  } = container.customComponent.background;

  const { maxWidthPage } = frameGlobalOptions;

  const viewport = useViewport();

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";

  const backgroundColor = bgType === "bgColor" ? bgColor : "";
  const stylesBg = getBackgroundStyles(container.customComponent);

  const renderInnerComponentOnColumn = (comp) => {
    const type = comp.type;

    const Component = viewComponentsRender[type];
    const isFloatingComponent = type?.toLowerCase().startsWith("floating-");
    const isPopupComponent = type?.toLowerCase().startsWith("popup-");

    const isNavbarComponent = type === "navbar";

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
        isNavbarComponent={isNavbarComponent}
      />
    );
  };

  return (
    <div
      id={container.customComponent?.scrollTarget?.value}
      style={{
        borderRadius: rounded,
        paddingBottom: marginBottom,
        paddingTop: marginTop,
        backgroundColor,
        position: "relative",
        maxWidth: isFullWidth ? "100%" : maxWidthPage,
      }}
      className="w-full   mx-auto overflow-x-hidden"
    >
      {bgType === "image" ? (
        <div style={stylesBg.backgroundImgStyle}></div>
      ) : bgType === "gradients" ? (
        <div style={stylesBg.gradientStyle}></div>
      ) : bgType === "pattern" ? (
        <div style={stylesBg.backgroundPatternStyle}></div>
      ) : null}

      {bgType === "image" && opacity ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: opacity < 0 ? "black" : "white",
            opacity: Math.abs(stylesBg.calculateOpacity),
          }}
        ></div>
      ) : null}
      <div
        style={{
          maxWidth: maxWidthPage,
          zIndex: 1,
        }}
        className={`
      relative
      gap-5
      w-full
      max-w-full
      mx-auto  p-5
      ${
        isMobile
          ? "flex flex-col"
          : isTablet
          ? "grid grid-cols-2"
          : "flex flex-row"
      }
    `}
      >
        {container?.components?.map((comp) => {
          const baseStyle = convertStyleToReact(comp.style || {});
          const finalStyle = {
            ...baseStyle,
            width: isMobile || isTablet ? "100%" : baseStyle.width,
          };

          return (
            <div className="" style={finalStyle} key={comp?.attributes?.id}>
              {comp?.components?.map((item) =>
                renderInnerComponentOnColumn(item)
              )}
            </div>
          );
        })}
      </div>

      {shape?.value && (
        <>
          {Array.isArray(shape?.value) ? (
            <MultiWaveShape
              paths={shape.value}
              color={shape?.color}
              position={shape?.position}
              flip={shape.flip}
              height={shape?.height}
            />
          ) : (
            <WaveShape
              path={shape?.value}
              position={shape?.position}
              flip={shape?.flip}
              color={shape?.color}
              height={shape?.height}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContainerWrapper;
