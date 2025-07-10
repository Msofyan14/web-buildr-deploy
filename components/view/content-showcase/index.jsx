import { useActionClickTarget } from "@/hooks/useActionClickTarget";
import React, { useMemo } from "react";
import Image from "next/image";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import { useGoogleFont } from "@/hooks/useGoogleFont";
import { cn } from "@/lib/utils";

const ViewContentShowcase = ({ section }) => {
  const { isAddHeader, header, contents } = section;
  const {
    column,
    aspectRatio,
    imagePosition,
    titleColor,
    fontFamily,
    fontWeight,
    fontSize,
    textAligment,
    rounded,
    descriptionColor,
    descriptionFontWeight,
    descriptionFontFamily,
    descriptionFontSize,
    textAligmentDescription,
    isItalicHeader,
    isItalicDescription,
  } = section?.wrapperStyle || {};

  const columnClass = useMemo(() => {
    switch (column) {
      case "6":
        return "md:grid-cols-6";
      case "5":
        return "md:grid-cols-5";
      case "4":
        return "md:grid-cols-4";
      case "3":
        return "md:grid-cols-3";
      case "2":
        return "md:grid-cols-2";
      default:
        return "md:grid-cols-1";
    }
  }, [column]);

  const imageSizes = useMemo(() => {
    switch (column) {
      case "6":
        return "(max-width: 768px) 100vw, 16vw"; // 6 cols
      case "5":
        return "(max-width: 768px) 100vw, 20vw"; // 5 cols
      case "4":
        return "(max-width: 768px) 100vw, 25vw"; // 4 cols
      case "3":
        return "(max-width: 768px) 100vw, 33vw"; // 3 cols
      case "2":
        return "(max-width: 768px) 100vw, 50vw"; // 2 cols
      default:
        return "100vw"; // 1 col
    }
  }, [column]);

  const { onActionClickTarget } = useActionClickTarget();

  const sanitizedContent = useSanitizedFonts(header);
  const selectedFontHeader = useGoogleFont(fontFamily);
  const selectedFontDesc = useGoogleFont(descriptionFontFamily);

  return (
    <div className="relative">
      {isAddHeader && <div>{sanitizedContent}</div>}

      <div
        className={`relative items-stretch
    grid 
    gap-2 
    p-5 
    place-items-start 
    w-full 
    grid-cols-1
    sm:grid-cols-2
    ${columnClass}
  `}
      >
        {contents.map((content) => {
          return (
            <div
              key={content.id}
              className={`  w-full text-center flex flex-col items-center p-2 `}
            >
              <div className="w-full flex flex-col ">
                {imagePosition === "top" && (
                  <div
                    className="w-full relative my-3"
                    style={{
                      aspectRatio,
                      borderRadius: rounded,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={content?.image}
                      alt={content?.alt || ""}
                      fill
                      sizes={imageSizes}
                      placeholder="blur"
                      blurDataURL={content?.image}
                      className={`w-full h-full object-cover ${
                        content?.target?.options?.type ? "cursor-pointer" : ""
                      }`}
                      onClick={() => onActionClickTarget(content?.target)}
                    />
                  </div>
                )}

                <p
                  style={{
                    color: titleColor,
                    fontSize,
                    fontWeight,
                  }}
                  className={cn(
                    "w-full break-all",
                    isItalicHeader && "italic",
                    textAligment,
                    selectedFontHeader.className
                  )}
                >
                  {content.title}
                </p>

                {imagePosition === "center" && (
                  <div
                    className="w-full relative my-3"
                    style={{
                      aspectRatio,
                      borderRadius: rounded,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={content?.image}
                      alt={content?.alt || ""}
                      fill
                      sizes={imageSizes}
                      placeholder="blur"
                      blurDataURL={content?.image}
                      className={`w-full h-full object-cover ${
                        content?.target?.options?.type ? "cursor-pointer" : ""
                      }`}
                      onClick={() => onActionClickTarget(content?.target)}
                    />
                  </div>
                )}

                <p
                  style={{
                    color: descriptionColor,
                    fontSize: descriptionFontSize,
                    fontWeight: descriptionFontWeight,
                  }}
                  className={cn(
                    "w-full break-all",
                    isItalicDescription && "italic",
                    textAligmentDescription,
                    selectedFontDesc.className
                  )}
                >
                  {content.description}
                </p>

                {imagePosition === "bottom" && (
                  <div
                    className="w-full relative my-3"
                    style={{
                      aspectRatio,
                      borderRadius: rounded,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={content?.image}
                      alt={content?.alt || ""}
                      fill
                      sizes={imageSizes}
                      placeholder="blur"
                      blurDataURL={content?.image}
                      className={`w-full h-full object-cover ${
                        content?.target?.options?.type ? "cursor-pointer" : ""
                      }`}
                      onClick={() => onActionClickTarget(content?.target)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewContentShowcase;
