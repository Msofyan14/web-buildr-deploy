import { useRef, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useGoogleFont } from "@/hooks/useGoogleFont";

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words", // 'words' or 'letters'
  direction = "top", // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOutCubic",
  onAnimationComplete,
  style,
  fontFamily,
}) => {
  const selectedFont = useGoogleFont(fontFamily);

  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  const [trigger, setTrigger] = useState(0);

  // Default animations based on direction
  const defaultFrom =
    direction === "top"
      ? {
          filter: "blur(10px)",
          opacity: 0,
          transform: "translate3d(0,-50px,0)",
        }
      : {
          filter: "blur(10px)",
          opacity: 0,
          transform: "translate3d(0,50px,0)",
        };

  const defaultTo = [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      transform:
        direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
    },
    { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTrigger((prev) => prev + 1); // retrigger animation
        } else {
          setInView(false);
          animatedCount.current = 0; // reset animation count
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
            for (const step of animationTo || defaultTo) {
              await next(step);
            }
            animatedCount.current += 1;
            if (
              animatedCount.current === elements.length &&
              onAnimationComplete
            ) {
              onAnimationComplete();
            }
          }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
      reset: true,
      immediate: !inView,
    }))
  );

  return (
    <p
      ref={ref}
      className={`blur-text ${className} flex flex-wrap ${selectedFont.className}`}
      style={{
        ...style,
      }}
    >
      {springs.map((props, index) => (
        <animated.span
          key={`${trigger}-${index}`}
          style={props}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {elements[index] === " " ? "\u00A0" : elements[index]}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </animated.span>
      ))}
    </p>
  );
};

const ViewBlurText = ({ section }) => {
  const {
    text,
    delay,
    fontFamily,
    fontWeight,
    colorBlurText,
    fontSize,
    textAlign,
    animateBy,
    direction,
    isItalicHeader,
  } = section;

  return (
    <div className={`p-10 flex ${isItalicHeader && "italic"} ${textAlign}`}>
      <BlurText
        style={{
          fontWeight,
          color: colorBlurText,
          fontSize,
        }}
        text={text}
        delay={delay}
        animateBy={animateBy}
        direction={direction}
        fontFamily={fontFamily}
      />
    </div>
  );
};

export default ViewBlurText;
