import {
  Anton,
  Bokor,
  Playfair_Display,
  Poppins,
  Roboto,
  Crimson_Pro,
  Raleway,
  Oswald,
  Alegreya,
  Bebas_Neue,
  Montserrat,
  Courier_Prime,
  EB_Garamond,
  Open_Sans,
  Lato,
  DM_Serif_Text,
  Lobster,
  Style_Script,
  Sofia,
  Arvo,
  Fugaz_One,
  Abril_Fatface,
  Nunito,
  Nunito_Sans,
  Unbounded,
  Zilla_Slab,
  Source_Serif_4,
  Arima,
  Mulish,
  Urbanist,
  Manrope,
  Outfit,
  Sora,
  Inter,
  Merriweather,
  Monta,
  Six_Caps,
  Oxanium,
  Syne,
  Marcellus,
  Great_Vibes,
  Bona_Nova,
  Marcellus_SC,
  Anton_SC,
  Ailereon,
} from "next/font/google";

export const selectFonts = [
  { fontFamily: "Anton", weights: [400] },
  { fontFamily: "Bokor", weights: [400] },
  { fontFamily: "Playfair Display", weights: [400, 500, 600, 700, 800, 900] },
  { fontFamily: "Poppins", weights: [400, 700] },
  { fontFamily: "Roboto", weights: [400, 700] },
  { fontFamily: "Crimson Pro", weights: [400, 700] },
  { fontFamily: "Raleway", weights: [400, 700] },
  { fontFamily: "Oswald", weights: [400, 700] },
  { fontFamily: "Alegreya", weights: [400, 700] },
  { fontFamily: "Bebas Neue", weights: [400] },
  { fontFamily: "Montserrat", weights: [400, 500, 600, 700, 800] },
  { fontFamily: "Courier Prime", weights: [400, 700] },
  { fontFamily: "EB Garamond", weights: [400, 700] },
  { fontFamily: "Open Sans", weights: [400, 600, 700, 800] },
  { fontFamily: "Lato", weights: [400, 700, 900] },
  { fontFamily: "DM Serif Text", weights: [400] },
  { fontFamily: "Lobster", weights: [400] },
  { fontFamily: "Style Script", weights: [400] },
  { fontFamily: "Sofia", weights: [400] },
  { fontFamily: "Arvo", weights: [400, 700] },
  { fontFamily: "Fugaz One", weights: [400] },
  { fontFamily: "Abril Fatface", weights: [400] },
  { fontFamily: "Nunito", weights: [400, 700, 900] },
  { fontFamily: "Nunito Sans", weights: [400, 700, 900] },
  { fontFamily: "Unbounded", weights: [400, 700, 900] },
  { fontFamily: "Zilla Slab", weights: [400, 600, 700] },
  { fontFamily: "Source Serif 4", weights: [400, 600, 700, 900] },
  { fontFamily: "Arima", weights: [400, 700] },
  { fontFamily: "Mulish", weights: [300, 400, 600, 700, 800, 900] },
  { fontFamily: "Urbanist", weights: [100, 300, 400, 500, 600, 700, 800, 900] },
  { fontFamily: "Manrope", weights: [200, 300, 400, 500, 600, 700, 800] },
  { fontFamily: "Outfit", weights: [300, 400, 500, 600, 700, 800] },
  { fontFamily: "Sora", weights: [300, 400, 500, 600, 700, 800] },
  {
    fontFamily: "Inter",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  { fontFamily: "Merriweather", weights: [300, 400, 700, 900] },
  {
    fontFamily: "Monta",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  { fontFamily: "Six Caps", weights: [400] },
  { fontFamily: "Oxanium", weights: [200, 300, 400, 500, 600, 700, 800] },
  { fontFamily: "Syne", weights: [400, 500, 600, 700, 800, 900] },
  { fontFamily: "Marcellus", weights: [400] },
  { fontFamily: "Great Vibes", weights: [400] },
  { fontFamily: "Bona Nova", weights: [400] },
  { fontFamily: "Marcellus SC", weights: [400] },
  { fontFamily: "Anton SC", weights: [400] },
  { fontFamily: "Ailereon", weights: [400] },
];

export const abrilFatfaceFont = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
export const nunitoSansFont = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
export const unboundedFont = Unbounded({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal"],
});
export const zillaSlabFont = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal"],
});
export const sourceSerifFont = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});
export const arimaFont = Arima({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
export const mulishFont = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
export const urbanistFont = Urbanist({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
export const manropeFont = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
export const outfitFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
export const soraFont = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
export const interFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
export const merriweatherFont = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});
export const montaFont = Monta({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});
export const sixCapsFont = Six_Caps({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const oxaniumFont = Oxanium({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
export const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});
export const marcellusFont = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const greatVibesFont = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const bonaNovaFont = Bona_Nova({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const marcellusSCFont = Marcellus_SC({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const antonSCFont = Anton_SC({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
export const ailereonFont = Ailereon({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const fugazOneFont = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const arvoFont = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// ✅ Roboto
export const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

// ✅ Poppins
export const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ✅ Playfair Display
export const playfairFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ✅ Bokor
export const bokorFont = Bokor({
  subsets: ["latin"],
  weight: ["400"],
});

// ✅ Anton
export const antonFont = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

// ✅ Crimson Pro
export const crimsonProFont = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ✅ Raleway
export const ralewayFont = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ✅ Oswald
export const oswaldFont = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
});

// ✅ Alegreya
export const alegreyaFont = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ✅ Bebas Neue
export const bebasNeueFont = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

// ✅ Montserrat
export const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ✅ Courier Prime
export const courierPrimeFont = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// ✅ EB Garamond
export const ebGaramondFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

// ✅ Open Sans
export const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

// ✅ Lato
export const latoFont = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

// ✅ DM Serif Text
export const dmSerifTextFont = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

// ✅ Lobster
export const lobsterFont = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

// ✅ Style Script
export const styleScriptFont = Style_Script({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

// ✅ Sofia
export const sofiaFont = Sofia({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

// ✅ All Fonts Map (untuk dynamic usage)
export const googleFonts = {
  Roboto: robotoFont,
  Poppins: poppinsFont,
  Playfair: playfairFont,
  Bokor: bokorFont,
  Anton: antonFont,
  Crimson_Pro: crimsonProFont,
  Raleway: ralewayFont,
  Oswald: oswaldFont,
  Alegreya: alegreyaFont,
  Bebas_Neue: bebasNeueFont,
  Montserrat: montserratFont,
  Courier_Prime: courierPrimeFont,
  EB_Garamond: ebGaramondFont,
  Open_Sans: openSansFont,
  Lato: latoFont,
  DM_Serif_Text: dmSerifTextFont,
  Lobster: lobsterFont,
  Style_Script: styleScriptFont,
  Sofia: sofiaFont,
};
