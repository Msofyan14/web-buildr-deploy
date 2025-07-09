import { useActionClickTarget } from "@/hooks/useActionClickTarget";
import Image from "next/image";

const ViewImagesFooter = ({ children, content, index }) => {
  const { onActionClickTarget } = useActionClickTarget();

  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
      className="max-w-full"
    >
      {children}

      <div className="flex flex-wrap gap-5 items-center ">
        {content.options.map((opt) => {
          return (
            <div
              key={opt.id}
              style={{
                width: content.imageWidth,
                aspectRatio: 2 / 1,
                position: "relative",
              }}
            >
              <Image
                key={opt.id}
                src={opt?.image}
                alt={opt?.alt || ""}
                fill
                placeholder="blur"
                blurDataURL={opt.image}
                className={`object-contain w-auto h-auto ${
                  opt?.target?.options?.type ? "cursor-pointer" : ""
                }`}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 10vw"
                onClick={() => onActionClickTarget(opt?.target)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewImagesFooter;
