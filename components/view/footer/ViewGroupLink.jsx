import { useActionClickTarget } from "@/hooks/useActionClickTarget";

const ViewGroupLink = ({ children, content, index, wrapperStyle }) => {
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

      <div className="flex flex-col flex-wrap gap-2 ">
        {content.options.map((opt) => {
          return (
            <p
              style={{
                color: wrapperStyle.subHeadingColor,
              }}
              className={` ${
                opt?.target?.options?.type ? "cursor-pointer" : ""
              }`}
              onClick={() => onActionClickTarget(opt?.target)}
              key={opt.id}
            >
              {opt.label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ViewGroupLink;
