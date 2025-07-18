"use client";

import { darkenRgbaColor } from "@/lib/darkenRgbaColor";
import { cx } from "class-variance-authority";
import { createElement, useState } from "react";
import * as Icons from "react-icons/fa";

const CustomButton = ({
  btn,
  fullWidth,
  onActionClickTarget,
  currentGlobalOptions,
}) => {
  const { schemeColor } = currentGlobalOptions || {};
  const bgColorComponent = currentGlobalOptions?.bgColor || "#ffffff";
  const [isHover, setIsHover] = useState(false);

  const fontSize = {
    default: "text-base", // Ukuran default (16px)
    sm: "text-xs", // Ukuran kecil (12px)
    lg: "text-lg", // Ukuran besar (18px)
    xl: "text-xl", // Ukuran ekstra besar (20px)
  };

  const iconSizeMap = {
    sm: 18,
    md: 20,
    lg: 26,
    xl: 32,
    default: 20,
  };

  const buttonSize = {
    default: "h-9  px-4 py-2  ",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    xl: "h-12 rounded-md px-10",
    icon: "h-9 w-9",
  };

  const {
    btnColor,
    variant,
    iconBtn,
    size,
    shadow,
    rounded,
    textColor,
    title,
    fontFamily,
    fontWeight,
    isItalic,
  } = btn.stylesBtn || {};
  const hoverColorConversion = darkenRgbaColor(btnColor, 0.1);

  const sizeClasses = fontSize[size] || fontSize.default;

  const sizeBtnClasses = buttonSize[size] || fontSize.default;

  const iconSizeClasses = iconSizeMap[size] || iconSizeMap.default;

  const ghostVariant =
    variant === "ghost" && "hover:bg-accent hover:text-accent-foreground";

  let btnColorWithHover = "";

  if (variant === "default") {
    btnColorWithHover = isHover ? hoverColorConversion : btnColor;
  } else if (variant === "outline") {
    btnColorWithHover = isHover ? hoverColorConversion : "transparent";
  }

  let btnTextColorWithHover = "";

  if (variant === "outline") {
    btnTextColorWithHover = isHover
      ? bgColorComponent
      : schemeColor
      ? btnColor
      : textColor;
  } else if (variant === "default") {
    btnTextColorWithHover = textColor;
  }

  return (
    <button
      data-gjs-highlightable={true}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        borderRadius: rounded,
        color: btnTextColorWithHover,
        border: variant === "outline" ? `1px solid ${btnColor}` : "",
        backgroundColor: btnColorWithHover,
      }}
      className={cx(
        "flex justify-center items-center shadow-sm",
        shadow,
        sizeBtnClasses,
        ghostVariant,
        fullWidth && "w-full  "
      )}
      onClick={() => onActionClickTarget(btn.target)}
    >
      {iconBtn?.position === "right" ? (
        <div className="flex justify-center items-center gap-x-2">
          <span
            style={{
              fontFamily,
              fontWeight,
            }}
            className={`${sizeClasses} ${isItalic && "italic"}`}
          >
            {title}
          </span>

          {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
            <div style={{ color: iconBtn?.color }}>
              {createElement(Icons[iconBtn.icon], {
                size: iconSizeClasses,
              })}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-x-2">
          {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
            <div style={{ color: iconBtn?.color }}>
              {createElement(Icons[iconBtn.icon], {
                size: iconSizeClasses,
              })}
            </div>
          ) : null}

          <span
            style={{
              fontFamily,
              fontWeight,
            }}
            className={`${sizeClasses} ${isItalic && "italic"}`}
          >
            {title}
          </span>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
