import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";

const ViewTextElement = ({ section }) => {
  const { contents, animation } = section || {};

  const SanitizedContent = ({ html }) => {
    const sanitized = useSanitizedFonts(html);
    return <>{sanitized}</>;
  };

  return (
    <div className="">
      {contents.map((content) => {
        return (
          <AnimatedWrapper key={content.id} animationData={animation}>
            <SanitizedContent html={content.text} />
          </AnimatedWrapper>
        );
      })}
    </div>
  );
};

export default ViewTextElement;
