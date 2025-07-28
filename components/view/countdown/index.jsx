import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import DateCountDown from "./DateCountDown";
import DurationCountdown from "./DurationCountdown";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";

const ViewCountDown = ({ section }) => {
  const { isAddHeader, header, contents, animation, animationHeader } = section;

  const sanitizedContent = useSanitizedFonts(header);

  return (
    <div className="relative">
      {isAddHeader && (
        <AnimatedWrapper animationData={animationHeader}>
          {sanitizedContent}
        </AnimatedWrapper>
      )}

      {contents.map((content) => {
        return (
          <AnimatedWrapper key={content.id} animationData={animation}>
            <div className={`p-5`}>
              {content.type === "date-time" && (
                <DateCountDown
                  styles={section.wrapperStyle}
                  content={content}
                  finish={section.finish}
                />
              )}

              {content.type === "duration" && (
                <DurationCountdown
                  styles={section.wrapperStyle}
                  content={content}
                  finish={section.finish}
                />
              )}
            </div>
          </AnimatedWrapper>
        );
      })}
    </div>
  );
};

export default ViewCountDown;
