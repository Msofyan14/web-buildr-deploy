"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MarqueeImages = ({ images, from = 0, to = "-100%" }) => {
  const renderImages = () => {
    return (
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="relative h-36 w-36 md:h-40 md:w-56  flex-shrink-0"
            >
              <Image
                src={image.image}
                alt={image.alt || `Image ${index + 1}`}
                fill
                className="object-contain px-5 md:px-10"
                sizes="(max-width: 768px) 144px, 224px"
                priority
              />
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="flex ">
      {renderImages()}
      {renderImages()}
    </div>
  );
};

const ViewMarqueeImages = ({ section }) => {
  const { contents, speed } = section;

  return (
    <div className={` overflow-x-hidden flex `}>
      <MarqueeImages images={contents} speed={speed} />
    </div>
  );
};

export default ViewMarqueeImages;
