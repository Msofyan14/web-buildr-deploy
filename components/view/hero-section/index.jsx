// import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";

import CustomButton from "@/components/CustomButton";
import { useActionClickTarget } from "@/hooks/useActionClickTarget";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import Image from "next/image";

const ViewHeroSection = ({ section, buildContainerStyle }) => {
  const { contents, animation, animationText, buttons } = section;
  const {
    withButton,
    variant,
    btnPosition,
    shadow,
    alignText,
    alignButtons,
    widthText,
  } = section.wrapperStyle;

  const currentGlobalOptions = buildContainerStyle;

  //   const { elementRef, getClassName, duration } =
  //     useAnimatedVisibility(animation);

  //   const {
  //     elementRef: elementRefContent,
  //     getClassName: getClassNameContent,
  //     duration: durationContent,
  //   } = useAnimatedVisibility(animationText);

  const { onActionClickTarget } = useActionClickTarget();

  const SanitizedContent = ({ html }) => {
    const sanitized = useSanitizedFonts(html);
    return <>{sanitized}</>;
  };

  return (
    <div>
      {variant === "basic" && (
        <div className={`relative mx-auto`}>
          {contents.map((content) => {
            return (
              <div
                key={content.id}
                className="flex !flex-wrap md:!flex-nowrap  gap-x-5 items-center"
              >
                {content.imagePosition === "left" ? (
                  <>
                    <div
                      data-gjs-selectable="true"
                      //   ref={elementRef}
                      //   className={`${shadow} ${getClassName()}`}
                      className={`${shadow}  relative `}
                      style={{
                        transform: `rotate(${content.rotation}deg)`,
                        // "--animation-duration": `${duration}s`,
                        aspectRatio: 5 / 3,
                        width: content.width,
                      }}
                      key={content.id}
                    >
                      <Image
                        src={content?.image}
                        alt={content?.alt || ""}
                        fill
                        className={`object-cover rounded ${
                          content?.target?.options?.type ? "cursor-pointer" : ""
                        }`}
                        onClick={() => onActionClickTarget(content?.target)}
                        placeholder="blur"
                        blurDataURL={content?.image}
                      />
                    </div>

                    <div className=" p-3 w-full ">
                      <div
                        // ref={elementRefContent}
                        className={`mb-3 min-w-full break-all `}

                        //   className={`${getClassNameContent()}  mb-3 min-w-full break-all `}
                        // style={{
                        //   "--animation-duration": `${durationContent}s`,
                        // }}
                      >
                        <div>
                          <SanitizedContent html={content.textBanner} />
                        </div>
                      </div>

                      {withButton && (
                        <div
                          className={` flex !flex-wrap  gap-3 ${btnPosition} `}
                        >
                          {buttons.map((btn) => {
                            return (
                              <CustomButton
                                key={btn.id}
                                btn={btn}
                                onActionClickTarget={onActionClickTarget}
                                currentGlobalOptions={currentGlobalOptions}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 w-full">
                      <div
                        // ref={elementRefContent}
                        className={`mb-3 `}
                        // className={`${getClassNameContent()} mb-3 `}
                        // style={{
                        //   "--animation-duration": `${durationContent}s`,
                        // }}
                      >
                        <div>
                          <SanitizedContent html={content.textBanner} />
                        </div>
                      </div>

                      {withButton && (
                        <div
                          className={` flex !flex-wrap  gap-3 ${btnPosition} `}
                        >
                          {buttons.map((btn) => {
                            return (
                              <CustomButton
                                key={btn.id}
                                btn={btn}
                                onActionClickTarget={onActionClickTarget}
                                currentGlobalOptions={currentGlobalOptions}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div
                      //   ref={elementRef}
                      className={`${shadow} relative `}
                      // className={`${shadow} ${getClassName()}`}
                      style={{
                        transform: `rotate(${content.rotation}deg)`,
                        // "--animation-duration": `${duration}s`,
                        aspectRatio: 5 / 3,
                        width: content.width,
                      }}
                      key={content.id}
                    >
                      <Image
                        src={content?.image}
                        alt={content?.alt || ""}
                        fill
                        className={`object-cover rounded ${
                          content?.target?.options?.type ? "cursor-pointer" : ""
                        }`}
                        onClick={() => onActionClickTarget(content?.target)}
                        placeholder="blur"
                        blurDataURL={content?.image}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {variant === "no-image" && (
        <div className={`w-full flex ${alignText} items-center relative`}>
          {contents.map((content) => {
            return (
              <div key={content.id} className="max-w-full">
                <div
                  style={{
                    width: widthText,
                    padding: 12,
                    maxWidth: "100%",
                  }}
                >
                  <div
                    // ref={elementRefContent}
                    className={` mb-3 `}
                    //  className={`${getClassNameContent()} mb-3 `}
                    // style={{
                    //   "--animation-duration": `${durationContent}s`,
                    // }}
                  >
                    <div>
                      <SanitizedContent html={content.textBanner} />
                    </div>
                  </div>

                  {withButton && (
                    <div
                      className={` flex !flex-wrap ${alignButtons}  gap-3  `}
                    >
                      {buttons.map((btn) => {
                        return (
                          <CustomButton
                            key={btn.id}
                            btn={btn}
                            onActionClickTarget={onActionClickTarget}
                            currentGlobalOptions={currentGlobalOptions}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewHeroSection;
