import { a, useTransition } from "@react-spring/web";
import { useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";

const ViewImageDetail = ({ children, isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      // Delay unmount for exit animation
      const timeout = setTimeout(() => setShowModal(false), 200); // match with duration-200
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose(false);
  };

  if (!showModal) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200",
        {
          " animate-in fade-in-0": isOpen,
          " animate-out fade-out-0": !isOpen,
        }
      )}
    >
      <div
        className={clsx(
          "relative w-full p-6 m-5 bg-white shadow-lg  sm:max-w-screen-sm md:max-w-screen-md rounded-lg transition-all duration-200",
          ""
        )}
      >
        <div
          onClick={handleClose}
          className="absolute top-2 right-3 cursor-pointer z-10"
        >
          <MdClose
            size={20}
            className="transition-all ease-in-out hover:scale-125"
          />
        </div>

        <div className="my-2">{children}</div>
      </div>
    </div>
  );
};

const GalleryMasonry = ({ data, buildContainerStyle }) => {
  const currentGlobalOptions = buildContainerStyle;
  const { maxWidthPage } = currentGlobalOptions || {};

  const [columns, setColumns] = useState(2);

  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const updateColumns = (targetWindow = window) => {
      const width = targetWindow.innerWidth;

      if (width >= 1500) {
        setColumns(5);
      } else if (width >= 1000) {
        setColumns(4);
      } else if (width >= 600) {
        setColumns(3);
      } else {
        setColumns(1);
      }
    };

    const timeout = setTimeout(() => {
      const targetWindow = window;

      updateColumns(targetWindow);
      targetWindow.addEventListener("resize", () =>
        updateColumns(targetWindow)
      );

      return () => {
        targetWindow.removeEventListener("resize", () =>
          updateColumns(targetWindow)
        );
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      const widthContainer = Math.min(window.innerWidth, maxWidthPage);
      setWidth(widthContainer);
    };

    updateWidth();

    const targetWindow = window;
    targetWindow.addEventListener("resize", updateWidth);

    return () => {
      targetWindow.removeEventListener("resize", updateWidth);
    };
  }, [maxWidthPage]);

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  const handleSelectItem = (item) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  return (
    <>
      <div
        ref={ref}
        className="relative w-full h-full cursor-pointer"
        style={{
          height: Math.max(...heights),
        }}
      >
        {transitions((style, item) => (
          <a.div
            key={item.id}
            style={style}
            className={`absolute p-[15px] [will-change:transform,width,height,opacity]`}
            onClick={() => handleSelectItem(item)}
          >
            <div
              className="relative w-full h-full overflow-hidden uppercase text-[10px] leading-[10px] rounded-[4px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] transition duration-300 ease hover:scale-110"
              style={{
                backgroundColor: "#ffffff",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </a.div>
        ))}
      </div>

      <ViewImageDetail isOpen={isOpen} onClose={setIsOpen}>
        <div className="w-full flex  justify-center ">
          <div className="relative w-full aspect-video max-w-screen-md">
            <Image
              src={selectedItem.image}
              alt={`detail-${selectedItem.image}`}
              fill
              placeholder="blur"
              blurDataURL={selectedItem.image}
              sizes="(min-width: 768px) 768px, (min-width: 640px) 640px, 100vw"
              className="object-contain rounded"
            />
          </div>
        </div>
      </ViewImageDetail>
    </>
  );
};

const ViewGalleryMasonry = ({ section, buildContainerStyle }) => {
  const { isAddHeader, header, contents, animationHeader } = section;

  const sanitizedContent = useSanitizedFonts(header);

  return (
    <div className="relative">
      {isAddHeader && (
        <AnimatedWrapper animationData={animationHeader}>
          {sanitizedContent}
        </AnimatedWrapper>
      )}

      <GalleryMasonry
        data={contents}
        buildContainerStyle={buildContainerStyle}
      />
    </div>
  );
};

export default ViewGalleryMasonry;
