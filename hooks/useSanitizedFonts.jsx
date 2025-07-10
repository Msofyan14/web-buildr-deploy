import { useMemo } from "react";
import parse, { domToReact } from "html-react-parser";
import { googleFonts } from "@/lib/goggleFonts";

const toFontKey = (name) => name?.trim().replace(/\s+/g, "_");

const camelCase = (str) =>
  str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

const parseStyle = (styleString = "") => {
  return styleString
    .split(";")
    .filter(Boolean)
    .reduce((acc, item) => {
      const [key, value] = item.split(":").map((x) => x.trim());
      if (key && value) {
        acc[camelCase(key)] = value;
      }
      return acc;
    }, {});
};

export const useSanitizedFonts = (html) => {
  const sanitizedContent = useMemo(() => {
    if (!html) return null;

    return parse(html, {
      replace: (domNode) => {
        if (domNode.attribs?.style) {
          const styleAttr = domNode.attribs.style;
          const fontMatch = styleAttr.match(
            /font-family:\s*['"]?([^;"']+)['"]?/i
          );

          if (fontMatch) {
            const fontName = fontMatch[1];
            const key = toFontKey(fontName);
            const font = googleFonts[key] || googleFonts["Roboto"];
            const className = font?.className;

            if (className) {
              const newStyleStr = styleAttr
                .split(";")
                .filter(
                  (item) => !item.trim().toLowerCase().startsWith("font-family")
                )
                .join(";")
                .trim();

              const styleObj = parseStyle(newStyleStr);

              return (
                <span className={className} style={styleObj}>
                  {domToReact(domNode.children)}
                </span>
              );
            }
          }
        }
        return;
      },
    });
  }, [html]);

  return sanitizedContent;
};
