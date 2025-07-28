import { useBackgroundStyles } from "@/hooks/useBackgroundStyles";
import { cn } from "@/lib/utils";
import { WaveShape } from "./WaveShape";
import { MultiWaveShape } from "./MultiWaveShape";

const ContainerView = ({
  children,
  targetId,
  section,
  maxWidthPage,
  isNavbarComponent,
}) => {
  const { shape, marginTop, marginBottom, rounded, isFullWidth } =
    section?.background || {};
  const stylesBg = useBackgroundStyles(section);

  const navbarPosition = section?.wrapperStyle?.position;
  const backgroundColor =
    section?.background?.bgType === "bgColor"
      ? section?.background?.bgColor
      : "";

  if (!section) {
    return null;
  }

  return (
    <div
      id={targetId}
      className={cn(
        "mx-auto w-full",
        isNavbarComponent && navbarPosition === "sticky"
          ? "sticky top-0"
          : "relative",
        isNavbarComponent ? "" : "overflow-hidden"
      )}
      style={{
        borderRadius: rounded,
        paddingBottom: marginBottom,
        paddingTop: marginTop,
        backgroundColor,
        maxWidth: isFullWidth ? "100%" : maxWidthPage,
        zIndex: isNavbarComponent ? 3 : 2,
      }}
    >
      {section?.background?.bgType === "image" ? (
        <div style={stylesBg.backgroundImgStyle}></div>
      ) : section?.background?.bgType === "gradients" ? (
        <div style={stylesBg.gradientStyle}></div>
      ) : section?.background?.bgType === "pattern" ? (
        <div style={stylesBg.backgroundPatternStyle}></div>
      ) : null}

      {section?.background?.bgType === "image" &&
      section.background?.opacity ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor:
              section.background?.opacity < 0 ? "black" : "white",
            opacity: Math.abs(stylesBg.calculateOpacity),
          }}
        ></div>
      ) : null}

      <div
        className="mx-auto relative "
        style={{
          maxWidth: maxWidthPage,
          zIndex: 1,
        }}
      >
        {children}
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

export default ContainerView;
