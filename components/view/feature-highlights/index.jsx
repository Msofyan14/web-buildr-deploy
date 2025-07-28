// import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";

import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { useGoogleFont } from "@/hooks/useGoogleFont";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewFeatureHighlights = ({ section }) => {
  const { isAddHeader, header, contents, animation, animationHeader } = section;
  const {
    textShadow,
    titleColor,
    fontWeight,
    fontFamily,
    fontSize,
    textAligment,
    isItalicHeader,
  } = section.wrapperStyle;

  const sanitizedContent = useSanitizedFonts(header);
  const selectedFontHeader = useGoogleFont(fontFamily);

  return (
    <div className="relative">
      {isAddHeader && (
        <AnimatedWrapper animationData={animationHeader}>
          {sanitizedContent}
        </AnimatedWrapper>
      )}

      <div className={`flex ${textAligment}`}>
        <AnimatedWrapper animationData={animation}>
          <div className={`flex flex-col p-5 `}>
            {contents.map((content) => {
              const iconBtn = content.iconBtn;

              return (
                <div
                  key={content.id}
                  className={`flex items-center gap-x-2 my-2    `}
                >
                  {iconBtn.position === "left" ? (
                    <>
                      {iconBtn?.icon?.startsWith("Fa") &&
                      Icons[iconBtn.icon] ? (
                        <div style={{ color: iconBtn?.color }}>
                          {createElement(Icons[iconBtn.icon], {
                            size: iconBtn?.size,
                          })}
                        </div>
                      ) : null}

                      <p
                        style={{
                          color: titleColor,
                          fontSize,
                          textShadow,
                          fontWeight,
                        }}
                        className={`w-full break-all ${
                          isItalicHeader && "italic"
                        }  ${selectedFontHeader.className}  `}
                      >
                        {content.title}
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          color: titleColor,
                          fontSize,
                          textShadow,
                          fontWeight,
                        }}
                        className={`w-full break-all ${
                          isItalicHeader && "italic"
                        }   ${selectedFontHeader.className}  `}
                      >
                        {content.title}
                      </p>

                      {iconBtn?.icon?.startsWith("Fa") &&
                      Icons[iconBtn.icon] ? (
                        <div style={{ color: iconBtn?.color }}>
                          {createElement(Icons[iconBtn.icon], {
                            size: iconBtn?.size,
                          })}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default ViewFeatureHighlights;
