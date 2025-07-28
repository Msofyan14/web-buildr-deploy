import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";
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

  const { onActionClickTarget } = useActionClickTarget();

  return (
    <div className="relative">
      <AnimatedWrapper animationData={animation}>
        <div className={`flex justify-center`}>
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
      </AnimatedWrapper>
    </div>
  );
};

export default ViewImageElement;
