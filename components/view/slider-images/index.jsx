import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";

const ViewSliderImages = ({ section }) => {
  const { contents } = section;
  const {
    aspectRatio,
    autoSlide,
    transitions,
    variant,
    navigation,
    pagination,
  } = section.wrapperStyle;

  const delay = autoSlide * 1000;

  const { onActionClickTarget } = useActionClickTarget();

  return (
    <div>
      {variant === "full-slider" && (
        <div
          className={`w-full ${
            transitions === "flip" || transitions === "cube" ? "" : "flex"
          }  h-full`}
        >
          <Swiper
            key={`swiper-${delay}-${transitions}`}
            effect={transitions}
            navigation={navigation}
            pagination={pagination}
            grabCursor={true}
            modules={[
              Navigation,
              EffectFade,
              EffectCoverflow,
              EffectCreative,
              EffectCube,
              EffectFlip,
              Autoplay,
              Pagination,
            ]}
            autoplay={
              delay
                ? {
                    delay: delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : undefined
            }
            speed={1000}
            loop={true}
            observer={true}
            observeParents={true}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-125%", 0, -800],
                rotate: [0, 0, -90],
              },
              next: {
                shadow: true,
                translate: ["125%", 0, -800],
                rotate: [0, 0, 90],
              },
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
          >
            {contents.map((content) => (
              <SwiperSlide key={content.id}>
                <div
                  className={`relative w-full  ${
                    content?.target?.options?.type ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onActionClickTarget(content?.target)}
                  style={{
                    aspectRatio: aspectRatio || 16 / 9,
                  }}
                >
                  <img
                    src={content?.image}
                    alt={content?.alt || ""}
                    // fill
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    placeholder="blur"
                    // blurDataURL={content?.image}
                    className="w-full h-full object-cover "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ViewSliderImages;
