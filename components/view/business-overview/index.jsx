import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { useSanitizedFonts } from "@/hooks/useSanitizedFonts";
import { useGoogleFont } from "@/hooks/useGoogleFont";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";

const CountUp = ({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2, // Duration of the animation in seconds
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
  style,
}) => {
  const ref = useRef(null);

  const motionValue = useMotionValue(direction === "down" ? to : from);

  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration); // Adjust this formula for finer control
  const stiffness = 100 * (1 / duration); // Adjust this formula for finer control

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const [isInView, setIsInView] = useState(false);

  // 👉 Custom Intersection Observer
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // 10% terlihat
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  // Start the animation when in view and startWhen is true
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === "function") {
          onEnd();
        }
      }, delay * 1000 + duration * 1000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  // Update text content with formatted number on spring value change
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const options = {
          useGrouping: !!separator,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        };

        const formattedNumber = Intl.NumberFormat("en-US", options).format(
          latest.toFixed(0)
        );

        ref.current.textContent = separator
          ? formattedNumber.replace(/,/g, separator)
          : formattedNumber;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator]);

  return (
    <span
      className={`${className}`}
      ref={ref}
      style={{
        ...style,
      }}
    />
  );
};

const ViewBusinessOverview = ({ section }) => {
  const {
    textShadow,
    fontFamily,
    fontWeight,
    colorRangeValue,
    fontSize,
    separator,
    direction,
    duration,
    distance,
    textAligment,
    fontSizeOverview,
    fontFamilyOverview,
    fontWeightOverview,
    colorOverview,
    isItalicHeader,
    isItalicOverview,
  } = section.wrapperStyle;

  const { isAddHeader, header, contents, animationHeader } = section;

  const sanitizedContent = useSanitizedFonts(header);
  const selectedFontHeader = useGoogleFont(fontFamily);
  const selectedFontOverview = useGoogleFont(fontFamilyOverview);

  return (
    <div className="relative">
      {isAddHeader && (
        <AnimatedWrapper animationData={animationHeader}>
          {sanitizedContent}
        </AnimatedWrapper>
      )}

      <div
        style={{
          gap: distance,
        }}
        className={`flex flex-wrap  ${textAligment}  relative px-5`}
      >
        {contents.map((content) => {
          const { rangeValue, from, overview, symbol } = content;

          return (
            <div
              key={content.id}
              className={`flex flex-col items-center gap-y-1 `}
            >
              <div className={`flex ${isItalicHeader && "italic"}`}>
                <CountUp
                  style={{
                    fontWeight,
                    color: colorRangeValue,
                    fontSize,
                    textShadow,
                  }}
                  from={from}
                  to={rangeValue}
                  separator={separator}
                  direction={direction}
                  duration={duration}
                  className={`${selectedFontHeader.className}`}
                />

                <p
                  className={`mx-1 ${selectedFontHeader.className}`}
                  style={{
                    fontWeight,
                    color: colorRangeValue,
                    fontSize,
                    textShadow,
                  }}
                >
                  {symbol}
                </p>
              </div>

              <p
                className={`break-all ${isItalicOverview && "italic"} ${
                  selectedFontOverview.className
                }`}
                style={{
                  fontWeight: fontWeightOverview,
                  color: colorOverview,
                  fontSize: fontSizeOverview,
                  textShadow,
                }}
              >
                {overview}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBusinessOverview;
