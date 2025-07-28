import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { useGoogleFont } from "@/hooks/useGoogleFont";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ViewFAQ = ({ section }) => {
  const { isAddHeader, header, contents, animationHeader } = section;
  const {
    colorTitle,
    fontWeight,
    fontFamily,
    fontSize,
    borderColor,
    iconColor,
    variant,
    descriptionColor,
    descriptionFontWeight,
    descriptionFontFamily,
    descriptionFontSize,
    isItalicHeader,
    isItalicDescription,
  } = section.wrapperStyle;
  const [openItems, setOpenItems] = useState([]);
  const contentRefs = useRef({});
  const prevVariant = useRef(variant);

  const selectedFontHeader = useGoogleFont(fontFamily);
  const selectedFontDesc = useGoogleFont(descriptionFontFamily);

  const toggleItem = (id) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter((itemId) => itemId !== id)
        : [...prevOpenItems, id]
    );
  };

  useEffect(() => {
    const updateHeights = () => {
      Object.entries(contentRefs.current).forEach(([id, el]) => {
        if (el) {
          el.style.transition = "max-height 0.3s ease-in-out";
          el.style.maxHeight = openItems.includes(id)
            ? `${el.scrollHeight}px`
            : "0px";
        }
      });
    };

    updateHeights(); // initial call

    window.addEventListener("resize", updateHeights);
    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, [openItems]);

  useEffect(() => {
    if (prevVariant.current !== variant) {
      setOpenItems([]);
      prevVariant.current = variant;
    }
  }, [variant]);

  const sanitizedContent = useSanitizedFonts(header);

  return (
    <div className="relative">
      {isAddHeader && (
        <AnimatedWrapper animationData={animationHeader}>
          {sanitizedContent}
        </AnimatedWrapper>
      )}

      {variant === "basic" && (
        <div className="flex flex-col p-5 relative ">
          {contents.map((content) => {
            const isOpen = openItems.includes(content.id);
            return (
              <div
                key={content.id}
                className={`p-3  transition-all duration-300 ease-in-out `}
                style={{
                  borderBottom: `1px solid ${borderColor} `,
                }}
              >
                <div className="flex justify-between items-center">
                  <p
                    style={{
                      color: colorTitle,

                      fontSize: fontSize,
                      fontWeight,
                    }}
                    className={`w-full break-all   ${
                      isItalicHeader && "italic"
                    }  ${selectedFontHeader.className}  `}
                  >
                    {content.title}
                  </p>

                  <ChevronDown
                    style={{
                      color: iconColor,
                    }}
                    onClick={() => toggleItem(content.id)}
                    className={`cursor-pointer transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  ref={(el) => (contentRefs.current[content.id] = el)}
                  className="overflow-hidden"
                  style={{ maxHeight: "0px" }}
                >
                  <div className="p-2">
                    <p
                      style={{
                        color: descriptionColor,

                        fontSize: descriptionFontSize,
                        fontWeight: descriptionFontWeight,
                      }}
                      className={`w-full break-all ${
                        isItalicDescription && "italic"
                      }  ${selectedFontDesc.className}  `}
                    >
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {variant === "card" && (
        <div className="flex flex-col p-5 relative">
          {contents.map((content) => {
            const isOpen = openItems.includes(content.id);
            return (
              <div
                key={content.id}
                className={`p-3   rounded-lg my-2 shadow transition-all duration-300 ease-in-out `}
                style={{
                  border: `1px solid ${borderColor} `,
                }}
              >
                <div className="flex justify-between items-center">
                  <p
                    style={{
                      color: colorTitle,
                      fontSize: fontSize,
                      fontWeight,
                    }}
                    className={`w-full break-all   ${
                      isItalicHeader && "italic"
                    }  ${selectedFontHeader.className}  `}
                  >
                    {content.title}
                  </p>

                  <ChevronDown
                    style={{
                      color: iconColor,
                    }}
                    onClick={() => toggleItem(content.id)}
                    className={`cursor-pointer transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  ref={(el) => (contentRefs.current[content.id] = el)}
                  className="overflow-hidden"
                  style={{ maxHeight: "0px" }}
                >
                  <div className="p-2">
                    <p
                      style={{
                        color: descriptionColor,
                        fontSize: descriptionFontSize,
                        fontWeight: descriptionFontWeight,
                      }}
                      className={`w-full break-all ${
                        isItalicDescription && "italic"
                      }  ${selectedFontDesc.className}  `}
                    >
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewFAQ;
