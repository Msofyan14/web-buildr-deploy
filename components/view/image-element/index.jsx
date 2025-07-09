import { useActionClickTarget } from "@/hooks/useActionClickTarget";
// import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import Image from "next/image";

const ViewImageElement = ({ section }) => {
  const { contents, animation } = section;
  const {
    width,
    rotation,
    borderColor,
    shadow,
    objectView,
    rounded,
    aspectRatio,
  } = section.wrapperStyle;

  //   const { elementRef, getClassName, duration } =
  //     useAnimatedVisibility(animation);

  const { onActionClickTarget } = useActionClickTarget();

  return (
    <div className="relative">
      <div
        // ref={elementRef}
        // style={{
        //   "--animate-duration": `${duration}s`,
        //   willChange: "transform, opacity",
        // }}
        // className={`flex justify-center ${getClassName()}`}
        className={`flex justify-center`}
      >
        {contents.map((content) => (
          <div
            className={`${shadow}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              borderRadius: rounded,
              overflow: "hidden",
            }}
            key={content.id}
          >
            <div
              style={{
                position: "relative",
                width: width || "100%",
                aspectRatio,
                border: borderColor ? `2px solid ${borderColor}` : "",
                borderRadius: rounded,
              }}
              className={`${objectView} ${
                content?.target?.options?.type ? "cursor-pointer" : ""
              }`}
              onClick={() => onActionClickTarget(content?.target)}
            >
              <Image
                src={content?.image}
                alt={content?.alt || ""}
                fill
                placeholder="blur"
                blurDataURL={content?.image}
                sizes={`${width}px`}
                className={`${objectView}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewImageElement;
