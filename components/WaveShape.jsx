export const WaveShape = ({
  path = "",
  position = "bottom",
  flip = false,
  color = "#a2d9ff",
  height = "200px",
}) => {
  const isTop = position === "top";

  const positionClass = isTop ? "top-0" : "bottom-0";

  const transform = `${flip ? "scaleX(-1)" : ""} ${
    isTop ? "rotate(180deg)" : ""
  }`.trim();

  return (
    <div
      className={`absolute z-0  w-full ${positionClass}`}
      style={{
        height,
        transform,
        transformOrigin: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path fill={color} d={path} />
      </svg>
    </div>
  );
};
