"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { TfiMenuAlt } from "react-icons/tfi";

import { createElement } from "react";
import * as Icons from "react-icons/fa";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useEffect, useState } from "react";
import ViewMenuNavbar from "./_components/ViewMenuNavbar";
import ViewSingleLinkNavbar from "./_components/ViewSingleLinkNavbar";
import ViewButtonNavbar from "./_components/ViewButtonNavbar";
import { cn } from "@/lib/utils";

export const componentsNavbar = [
  {
    label: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    label: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    label: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    label: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    label: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    label: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const ViewNavbar = ({ section, maxWidthPage }) => {
  const {
    contents,
    side,
    type,
    text,
    iconHeading,
    logoWidth,
    wrapperStyle,
    logo,
  } = section;

  const [responsiveImage, setResponsiveImage] = useState(section.logoWidth);
  const [isActiveSheet, setIsActiveSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleScrollToTop = () => {
    const iframe = document.querySelector(".gjs-frame");

    if (iframe) {
      iframe.contentWindow.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResponsive = () => {
      let width = 0;

      width = document.body.clientWidth || window.innerWidth;

      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsActiveSheet(false);
      }
    };

    handleResponsive();

    window.addEventListener("resize", handleResponsive);
    return () => {
      window.removeEventListener("resize", handleResponsive);
    };
  }, []);

  useEffect(() => {
    const baseImageSize =
      typeof fontSize === "number" ? section.logoWidth : 150;

    const handleResize = () => {
      let width = 0;
      width = document.body.clientWidth || window.innerWidth;

      const isMobile = width <= 768;
      const adjustedImage = isMobile ? baseImageSize * 0.7 : logoWidth;
      setResponsiveImage(adjustedImage);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActiveSheet, logoWidth, section.logoWidth]);

  const renderNavbarItems = () => {
    return (
      <>
        {type === "image" ? (
          <div
            className={` ${isActiveSheet && "border-b"} `}
            onClick={handleScrollToTop}
          >
            <div
              style={{
                width: responsiveImage,
                aspectRatio: 2 / 1,
                position: "relative",
              }}
            >
              <Image
                src={logo}
                alt={"logo"}
                fill
                className={`object-contain w-auto h-auto`}
                placeholder="blur"
                blurDataURL={logo}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 10vw"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-x-3">
            {iconHeading?.position === "left" ? (
              <>
                {iconHeading?.icon?.startsWith("Fa") &&
                Icons[iconHeading.icon] ? (
                  <div style={{ color: iconHeading?.color }}>
                    {createElement(Icons[iconHeading.icon], {
                      size: iconHeading?.size,
                    })}
                  </div>
                ) : null}

                <div
                  className="break-all"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </>
            ) : (
              <>
                <div
                  className="break-all"
                  dangerouslySetInnerHTML={{ __html: text }}
                />

                {iconHeading?.icon?.startsWith("Fa") &&
                Icons[iconHeading.icon] ? (
                  <div style={{ color: iconHeading?.color }}>
                    {createElement(Icons[iconHeading.icon], {
                      size: iconHeading?.size,
                    })}
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}

        <div className={`${isMobile === isActiveSheet ? "block" : "hidden"}`}>
          <NavigationMenu>
            <NavigationMenuList
              className={` ${
                isActiveSheet && "flex flex-col gap-y-5 items-start"
              }  `}
            >
              {contents.map((content) => (
                <div key={content.id}>
                  {content.type === "single-link" && (
                    <ViewSingleLinkNavbar
                      content={content}
                      styles={wrapperStyle}
                    />
                  )}
                  {content.type === "menu-link" && (
                    <ViewMenuNavbar
                      content={content}
                      isMobile={isMobile}
                      styles={wrapperStyle}
                    />
                  )}
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div
          className={cn(
            isActiveSheet
              ? "block"
              : isMobile === isActiveSheet
              ? "flex  items-center gap-x-2"
              : "hidden"
          )}
        >
          {contents.map((content) => (
            <div key={content.id} className={cn(isActiveSheet && "mb-2")}>
              {content.type === "button" && (
                <ViewButtonNavbar content={content} isMobile={isMobile} />
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        maxWidth: maxWidthPage,
      }}
      className={`  relative mx-auto   `}
    >
      <div className="flex items-center justify-between  mx-3">
        {!isActiveSheet && <>{renderNavbarItems()}</>}

        <Sheet open={isActiveSheet} onOpenChange={setIsActiveSheet}>
          <SheetTrigger asChild>
            {!isActiveSheet && isMobile && (
              <Button
                className={`bg-transparent hover:bg-transparent`}
                onClick={() => setIsActiveSheet(true)}
                variant=""
              >
                <TfiMenuAlt
                  color={`${wrapperStyle.headingColor}`}
                  className={`scale-125`}
                />
              </Button>
            )}
          </SheetTrigger>

          <SheetContent
            style={{
              backgroundColor: wrapperStyle.bgColorSidebar,
            }}
            side={side}
            className="w-[375px] sm:w-[540px] pr-0"
          >
            <SheetHeader>
              <SheetTitle className="hidden">X</SheetTitle>
              <SheetDescription className="hidden">X</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-y-5 h-screen overflow-y-auto pr-5 pb-5 ">
              {renderNavbarItems()}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ViewNavbar;
