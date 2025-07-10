import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { useState } from "react";
import Heading from "./Heading";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";
import { darkenRgbaColor } from "@/lib/darkenRgbaColor";
import { useGoogleFont } from "@/hooks/useGoogleFont";

const ViewSingleLinkNavbar = ({ content, styles }) => {
  const [isHover, setIsHover] = useState(false);

  const {
    headingColor,
    headingFontSize,
    fontWeight,
    fontFamily,
    isItalicHeader,
  } = styles;

  const hoverColorConversion = darkenRgbaColor(headingColor, 0.3);

  const { onActionClickTarget } = useActionClickTarget();
  const selectedFontHeader = useGoogleFont(fontFamily);

  return (
    <NavigationMenuItem key={content?.id}>
      <div
        className={`hover:font-semibold   data-[state=open]:font-semibold cursor-pointer ${
          isItalicHeader && "italic"
        } ${selectedFontHeader.className}`}
        onClick={() => onActionClickTarget(content?.target)}
        style={{
          color: isHover ? hoverColorConversion : headingColor,
          fontSize: headingFontSize,
          fontWeight,
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Heading content={content} />
      </div>
    </NavigationMenuItem>
  );
};

export default ViewSingleLinkNavbar;
