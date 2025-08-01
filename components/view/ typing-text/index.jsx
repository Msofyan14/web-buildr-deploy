import { useEffect, useRef, useState, createElement } from "react";
import { gsap } from "gsap";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  fontSize = "1rem",
  fontFamily = "inherit",
  fontWeight = 400,
  cursorColor = "#000000",
  color, // override color
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => {
    if (!text) return [];
    return Array.isArray(text) ? text : [text];
  }, [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [typingSpeed, variableSpeed]);

  const getCurrentTextColor = () => {
    if (color) return color;
    if (textColors.length === 0) return "#000000";
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    const isEmptyText =
      !text ||
      (Array.isArray(text) &&
        text.every((t) => typeof t !== "string" || t.trim() === ""));

    if (isEmptyText) {
      setDisplayedText("");
      setCurrentCharIndex(0);
      setCurrentTextIndex(0);
      setIsDeleting(false);
    }
  }, [text]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentText = textArray[currentTextIndex] ?? "";
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);

          if (currentTextIndex === textArray.length - 1 && !loop) return;

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
      style: {
        fontSize,
        fontFamily,
        fontWeight,
        color: getCurrentTextColor(),
        ...props.style,
      },
    },
    <span className="inline">{displayedText}</span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100  ${
          shouldHideCursor ? "hidden" : ""
        } ${cursorClassName}`}
        style={{
          color: cursorColor,
        }}
      >
        {cursorCharacter}
      </span>
    )
  );
};

const ViewTypingText = ({ section }) => {
  const {
    text,
    fontFamily,
    fontWeight,
    fontSize,
    cursorColor,
    color,
    textAlign,
    isItalicHeader,
  } = section;

  return (
    <div className={cn("p-10 ", textAlign)}>
      <TextType
        text={text}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        color={color}
        cursorColor={cursorColor}
        typingSpeed={80}
        pauseDuration={1000}
        cursorCharacter="|"
        className={cn(isItalicHeader && "italic")}
      />
    </div>
  );
};

export default ViewTypingText;
