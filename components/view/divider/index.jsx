import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewDivider = ({ section }) => {
  const { variant, width, fullWidth, height, color, iconBtn } =
    section.mainStyles;

  return (
    <div>
      {iconBtn.icon ? (
        <div className="flex justify-center items-center w-full gap-x-3">
          {iconBtn?.position === "left" && (
            <>
              {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                <div style={{ color: iconBtn?.color }}>
                  {createElement(Icons[iconBtn.icon], {
                    size: iconBtn?.size,
                  })}
                </div>
              ) : null}

              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  maxWidth: "100%",
                  border: `${height}px ${variant} ${color} `,
                }}
              />
            </>
          )}

          {iconBtn?.position === "center" && (
            <>
              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  maxWidth: "100%",
                  border: `${height}px ${variant} ${color} `,
                }}
              />
              <div style={{ color: iconBtn?.color }}>
                {createElement(Icons[iconBtn?.icon], {
                  size: iconBtn.size,
                })}
              </div>

              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  border: `${height}px ${variant} ${color} `,
                }}
              />
            </>
          )}

          {iconBtn?.position === "right" && (
            <>
              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  maxWidth: "100%",
                  border: `${height}px ${variant} ${color} `,
                }}
              />
              {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                <div style={{ color: iconBtn?.color }}>
                  {createElement(Icons[iconBtn.icon], {
                    size: iconBtn?.size,
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            style={{
              width: fullWidth ? "100%" : width,
              maxWidth: "100%",
              border: `${height}px ${variant} ${color} `,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ViewDivider;
