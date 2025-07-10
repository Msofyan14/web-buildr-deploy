import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";

const ViewText = ({ children, content, index }) => {
  const sanitized = useSanitizedFonts(content.text);
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
    >
      {children}

      <div className="flex flex-col flex-wrap gap-2 ">
        <div className="break-all">{sanitized}</div>
      </div>
    </div>
  );
};

export default ViewText;
