import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";

const ViewTextElement = ({ section }) => {
  const { contents } = section || {};

  const SanitizedContent = ({ html }) => {
    const sanitized = useSanitizedFonts(html);
    return <>{sanitized}</>;
  };

  return (
    <div className="">
      {contents.map((content) => {
        return (
          <div key={content.id}>
            <SanitizedContent html={content.text} />
          </div>
        );
      })}
    </div>
  );
};

export default ViewTextElement;
