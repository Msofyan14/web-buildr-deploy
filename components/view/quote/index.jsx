// import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";

const ViewQuote = ({ section }) => {
  const { contents, animation } = section;

  //   const {
  //     elementRef: elementRefContent,
  //     getClassName: getClassNameContent,
  //     duration: durationContent,
  //   } = useAnimatedVisibility(animation);

  return (
    <div>
      {contents.map((content) => {
        const { quoteText, quoteTagColor, writer, writerColor } = content;

        return (
          <div
            key={content.id}
            // ref={elementRefContent}
            // style={{
            //   "--animation-duration": `${durationContent}s`,
            // }}
            // className={`flex flex-col items-center p-3 w-full  z-10 ${getClassNameContent()} `}

            className={`flex flex-col items-center p-3 w-full  z-10 `}
          >
            <div className="flex shrink-0 items-center w-full justify-center ">
              <span
                style={{ fontSize: 40, color: quoteTagColor }}
                className="font-bold  self-start"
              >
                “
              </span>

              <div dangerouslySetInnerHTML={{ __html: quoteText }} />

              <span
                style={{
                  fontSize: 40,
                  color: quoteTagColor,
                }}
                className="font-bold  self-end"
              >
                ”
              </span>
            </div>

            <div style={{ color: writerColor }} className="mt-3">
              {writer}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewQuote;
