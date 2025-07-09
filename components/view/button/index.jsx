import CustomButton from "@/components/CustomButton";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";

const ViewButtonElement = ({ section }) => {
  const { buttons } = section;
  const { position, align } = section.mainStyle;

  const classesPositionRow =
    position === "flex-row" && `flex-row ${align} items-center`;

  const classesPositionCol =
    position === "flex-col" &&
    `flex-col  ${
      align === "justify-start"
        ? "items-start"
        : align === "justify-center"
        ? "items-center"
        : "items-end"
    }`;

  const { onActionClickTarget } = useActionClickTarget();

  return (
    <div>
      <div
        className={`flex ${classesPositionRow} ${classesPositionCol}  w-full ${
          position === "flex-col" ? "gap-y-3" : "gap-x-3"
        } p-2 relative `}
      >
        {buttons.map((btn) => {
          return (
            <CustomButton
              key={btn.id}
              btn={btn}
              onActionClickTarget={onActionClickTarget}
              //   currentGlobalOptions={currentGlobalOptions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewButtonElement;
