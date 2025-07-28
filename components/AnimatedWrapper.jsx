import { motion } from "framer-motion";

const mapIntensity = (value, min, max) => (value / 100) * (max - min) + min;

// Fungsi utama generate animasi
const getAnimationProps = ({
  effect,
  direction = "inPlace",
  intensity = 50,
  duration = 0.5,
  delay = 0,
}) => {
  const intensityOffset = mapIntensity(intensity, 40, 300);
  const getOffset = () => {
    switch (direction) {
      case "fromLeft":
        return { opacity: 0, x: -intensityOffset, y: 0 };
      case "fromRight":
        return { opacity: 0, x: intensityOffset, y: 0 };
      case "fromTop":
        return { opacity: 0, x: 0, y: -intensityOffset };
      case "fromBottom":
        return { opacity: 0, x: 0, y: intensityOffset };
      default: // inPlace
        return { opacity: 0, x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  if (!effect) {
    // Tidak ada animasi
    return {
      initial: {},
      whileInView: {},
      transition: {},
    };
  }

  switch (effect) {
    case "fade":
      return {
        initial: offset,
        whileInView: { opacity: 1, x: 0, y: 0 },
        transition: { duration, delay },
      };

    case "slide":
      return {
        initial: offset,
        whileInView: { opacity: 1, x: 0, y: 0 },
        transition: {
          type: "tween", // agar tidak bounce
          ease: "easeOut",
          duration,
          delay,
        },
      };

    case "bounce": {
      if (direction === "inPlace") {
        const scaleStart = mapIntensity(intensity, 0.8, 0.5); // semakin tinggi intensity,

        return {
          initial: {
            scale: scaleStart,
            opacity: 0,
          },
          whileInView: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15,
              duration,
              delay,
            },
          },
        };
      }

      // default bounce (slide style)
      const bounceOffset = offset;

      return {
        initial: {
          ...bounceOffset,
          opacity: 0,
        },
        whileInView: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration,
            delay,
          },
        },
      };
    }

    case "zoomOut": {
      const intensityOffset = mapIntensity(intensity, 40, 300);
      const getOffset = () => {
        switch (direction) {
          case "fromLeft":
            return { x: -intensityOffset, y: 0 };
          case "fromRight":
            return { x: intensityOffset, y: 0 };
          case "fromTop":
            return { x: 0, y: -intensityOffset };
          case "fromBottom":
            return { x: 0, y: intensityOffset };
          default:
            return { x: 0, y: 0 };
        }
      };

      const scaleStart = mapIntensity(intensity, 1.1, 2);
      const { x, y } = getOffset();

      return {
        initial: { opacity: 0, scale: scaleStart, x, y },
        whileInView: { opacity: 1, scale: 1, x: 0, y: 0 },
        transition: { duration, delay },
      };
    }

    case "zoomIn": {
      const intensityOffset = mapIntensity(intensity, 40, 300);
      const getOffset = () => {
        switch (direction) {
          case "fromLeft":
            return { x: -intensityOffset, y: 0 };
          case "fromRight":
            return { x: intensityOffset, y: 0 };
          case "fromTop":
            return { x: 0, y: -intensityOffset };
          case "fromBottom":
            return { x: 0, y: intensityOffset };
          default:
            return { x: 0, y: 0 };
        }
      };

      const scaleStart = mapIntensity(intensity, 0.9, 0.5);
      const { x, y } = getOffset();

      return {
        initial: { opacity: 0, scale: scaleStart, x, y },
        whileInView: { opacity: 1, scale: 1, x: 0, y: 0 },
        transition: { duration, delay },
      };
    }

    case "flash":
      return {
        initial: { opacity: 0 },
        whileInView: {
          opacity: [0, 1, 0, 1],
        },
        transition: {
          duration: mapIntensity(intensity, 1.2, 0.3),
          repeat: 1,
          delay,
        },
      };

    case "pulse":
      return {
        initial: { scale: 1 },
        whileInView: {
          scale: [1, 1.05, 1],
        },
        transition: {
          duration: mapIntensity(intensity, 1.2, 0.3),
          repeat: 1,
          delay,
        },
      };

    case "shake": {
      const shakeDistance = mapIntensity(intensity, 2, 50);
      return {
        initial: { x: 0 },
        whileInView: {
          x: [-1, 1, -1, 1, 0].map((v) => v * shakeDistance),
        },
        transition: { duration: 0.6, delay },
      };
    }

    case "tada": {
      const scaleUp = mapIntensity(intensity, 1.05, 1.3); // seberapa besar zoom in
      const shakeAmount = mapIntensity(intensity, 2, 20); // intensitas shake

      return {
        initial: { scale: 1, rotate: 0 },
        whileInView: {
          scale: [1, scaleUp, scaleUp, scaleUp, scaleUp, scaleUp, 1],
          rotate: [
            0,
            0,
            -shakeAmount,
            shakeAmount,
            -shakeAmount,
            shakeAmount,
            0,
          ],
        },
        transition: {
          duration: 1,
          delay,
          ease: "easeInOut",
        },
      };
    }

    case "flipInX":
      return {
        initial: { rotateX: mapIntensity(intensity, 45, 180), opacity: 0 },
        whileInView: { rotateX: 0, opacity: 1 },
        transition: { duration, delay },
        style: { transformOrigin: "center" },
      };

    case "flipInY":
      return {
        initial: { rotateY: mapIntensity(intensity, 45, 180), opacity: 0 },
        whileInView: { rotateY: 0, opacity: 1 },
        transition: { duration, delay },
        style: { transformOrigin: "center" },
      };

    default:
      return {
        initial: {},
        whileInView: {},
        transition: {},
      };
  }
};

export const AnimatedWrapper = ({ children, animationData }) => {
  const {
    effect,
    duration = 0.5,
    delay = 0,
    tigger = "reAnimite",
    amount = 0.3,
    replayKey,
    intensity = 30,
    direction,
  } = animationData || {};

  const animation = getAnimationProps({
    effect,
    duration,
    delay,
    intensity,
    direction,
  });

  return (
    <motion.div
      key={`${effect}-${replayKey}-${tigger}-${delay}-${duration}-${direction}-${intensity}`}
      initial={animation.initial}
      whileInView={animation.whileInView}
      transition={animation.transition}
      viewport={{ once: tigger === "reAnimite" ? false : true, amount }}
    >
      {children}
    </motion.div>
  );
};
