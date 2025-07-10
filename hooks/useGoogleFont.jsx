import { googleFonts } from "@/lib/goggleFonts";

export const useGoogleFont = (fontFamily) => {
  const toFontKey = (name) => name?.trim().replace(/\s+/g, "_");

  const fontKey = toFontKey(fontFamily);
  const selectedFont = googleFonts[fontKey] || googleFonts["Roboto"];

  return selectedFont;
};
