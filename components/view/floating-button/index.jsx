import CustomButton from "@/components/CustomButton";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";

const ViewFloatingButton = ({ section, maxWidthPage }) => {
  const { buttons } = section;
  const { position, verticalPosition = 80 } = section.mainStyle;

  const { onActionClickTarget } = useActionClickTarget();

  return (
    <div
      style={{
        bottom: verticalPosition,
        maxWidth: maxWidthPage,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      className="fixed z-10 w-full  "
    >
      <div
        className={` flex ${position} justify-center items-center w-full ${
          position === "flex-col" ? "gap-y-3" : "gap-x-3"
        } px-2  `}
      >
        {buttons.map((btn) => {
          return (
            <CustomButton
              key={btn.id}
              btn={btn}
              onActionClickTarget={onActionClickTarget}
              fullWidth
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewFloatingButton;
