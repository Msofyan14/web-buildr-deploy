import CustomButton from "@/components/CustomButton";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";

const ViewButtonNavbar = ({ content, isMobile }) => {
  const { onActionClickTarget } = useActionClickTarget();

  return (
    <CustomButton
      btn={content}
      onActionClickTarget={onActionClickTarget}
      fullWidth={isMobile}
    />
  );
};

export default ViewButtonNavbar;
