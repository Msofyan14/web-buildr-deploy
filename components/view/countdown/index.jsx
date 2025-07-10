import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import DateCountDown from "./DateCountDown";
import DurationCountdown from "./DurationCountdown";
// import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";

const ViewCountDown = ({ section }) => {
  const { isAddHeader, header, contents, animation } = section;

  //   const { elementRef, getClassName, duration } =
  //     useAnimatedVisibility(animation);

  const sanitizedContent = useSanitizedFonts(header);

  return (
    <div className="relative">
      {isAddHeader && <div>{sanitizedContent}</div>}

      {contents.map((content) => {
        return (
          <div
            // ref={elementRef}
            // style={{
            //   "--animation-duration": `${duration}s`,
            // }}
            key={content.id}
            // className={`p-5 ${getClassName()}`}
            className={`p-5`}
          >
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
        );
      })}
    </div>
  );
};

export default ViewCountDown;
