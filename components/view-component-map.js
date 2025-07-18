import ViewBlurText from "./view/blur-text";
import ViewBusinessOverview from "./view/business-overview";
import ViewButtonElement from "./view/button";
import ViewFormCheckout from "./view/checkout-form";
import ContainerWrapper from "./ContainerWrapper";
import ViewContentShowcase from "./view/content-showcase";
import ViewCountDown from "./view/countdown";
import ViewDivider from "./view/divider";
import ViewEmptySpace from "./view/empty-space";
import ViewFAQ from "./view/faq";
import ViewFeatureHighlights from "./view/feature-highlights";
import ViewFloatingButton from "./view/floating-button";
import ViewFloatingButtonCircle from "./view/floating-button-circle";
import ViewFooter from "./view/footer";
import ViewFuzzyText from "./view/fuzzy-text";
import ViewGalleryMasonry from "./view/gallery-masonry";
import ViewGlitchText from "./view/glitch-text";
import ViewHeroSection from "./view/hero-section";
import ViewImage from "./view/image-content";
import ViewImageElement from "./view/image-element";
import ViewListImages from "./view/list-images";
import ViewMaps from "./view/maps";
import ViewMarqueeImages from "./view/marquee-images";
import ViewNavbar from "./view/navbar";
import ViewQuote from "./view/quote";
import ViewScrollVelocity from "./view/scroll-velocity";
import ViewSliderImages from "./view/slider-images";
import ViewSplitText from "./view/split-text";
import ViewTestimony from "./view/testimony";
import ViewTextElement from "./view/text-element";
import ViewVideo from "./view/video";
import ViewVideoText from "./view/video-text-banner";
import ViewPopup from "./ViewPopup";

export const viewComponentsRender = {
  "content-showcase": ViewContentShowcase,
  "list-images": ViewListImages,

  "text-element": ViewTextElement,
  footer: ViewFooter,
  "checkout-form": ViewFormCheckout,
  "empty-space": ViewEmptySpace,
  divider: ViewDivider,
  testimony: ViewTestimony,
  faq: ViewFAQ,
  "feature-highlights": ViewFeatureHighlights,
  countdown: ViewCountDown,
  quotes: ViewQuote,
  "slider-images": ViewSliderImages,
  "floating-button": ViewFloatingButton,
  "floating-button-circle": ViewFloatingButtonCircle,
  "hero-section": ViewHeroSection,
  "video-text-banner": ViewVideoText,
  "video-element": ViewVideo,
  "popup-wrapper": ViewPopup,
  "image-content": ViewImage,
  "image-element": ViewImageElement,
  "business-overview": ViewBusinessOverview,
  "button-element": ViewButtonElement,
  "gallery-masonry": ViewGalleryMasonry,
  "marquee-images": ViewMarqueeImages,
  "scroll-velocity-text": ViewScrollVelocity,
  "glitch-text": ViewGlitchText,
  "fuzzy-text": ViewFuzzyText,
  "blur-text": ViewBlurText,
  "split-text": ViewSplitText,
  navbar: ViewNavbar,
  "custom-maps": ViewMaps,
  "container-wrapper": ContainerWrapper,
};
