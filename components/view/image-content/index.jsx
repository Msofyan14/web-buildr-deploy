import { useActionClickTarget } from "@/hooks/useActionClickTarget";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import Image from "next/image";
import React from "react";

const ViewImage = ({ section }) => {
  const { isAddHeader, header, contents, animation } = section;
  const {
    width,
    rotation,
    borderColor,
    shadow,
    objectView,
    rounded,
    aspectRatio,
  } = section.wrapperStyle;

  const { onActionClickTarget } = useActionClickTarget();

  const sanitizedContent = useSanitizedFonts(header);

  return (
    <div className="relative">
      {isAddHeader && <div>{sanitizedContent}</div>}
      <div
        // ref={elementRef}
        // style={{
        //   "--animate-duration": `${duration}s`,
        //   willChange: "transform, opacity",
        // }}
        // className={`flex justify-center ${getClassName()}`}
        className={`flex justify-center`}
      >
        {contents.map((content) => (
          <div
            className={`${shadow}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              borderRadius: rounded,
              overflow: "hidden",
            }}
            key={content.id}
          >
            <div
              style={{
                position: "relative",
                width: width || "100%",
                aspectRatio,
                border: borderColor ? `2px solid ${borderColor}` : "",
                borderRadius: rounded,
              }}
              className={`${objectView} ${
                content?.target?.options?.type ? "cursor-pointer" : ""
              }`}
              onClick={() => onActionClickTarget(content?.target)}
            >
              <Image
                src={content?.image}
                alt={content?.alt || ""}
                fill
                placeholder="blur"
                blurDataURL={content?.image}
                sizes={`${width}px`}
                className={`${objectView}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewImage;
