import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { useState } from "react";
import Heading from "./Heading";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";
import { darkenRgbaColor } from "@/lib/darkenRgbaColor";

const ViewSingleLinkNavbar = ({ content, styles }) => {
  const [isHover, setIsHover] = useState(false);

  const { headingColor, headingFontSize, fontWeight, fontFamily } = styles;

  const hoverColorConversion = darkenRgbaColor(headingColor, 0.3);

  const { onActionClickTarget } = useActionClickTarget();

  return (
    <NavigationMenuItem key={content?.id}>
      <div
        className={`hover:font-semibold   data-[state=open]:font-semibold cursor-pointer`}
        onClick={() => onActionClickTarget(content?.target)}
        style={{
          color: isHover ? hoverColorConversion : headingColor,
          fontSize: headingFontSize,
          fontWeight,
          fontFamily,
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
