import { useState, useEffect, useCallback } from "react";

export const useViewport = (maxWidthPage = 1360) => {
  const [viewport, setViewport] = useState("desktop");

  const getViewport = useCallback(() => {
    if (typeof window === "undefined") return "desktop";

    const screenWidth = window.innerWidth;
    const effectiveWidth = Math.min(
      screenWidth,
      parseInt(maxWidthPage) || 1360
    );

    if (effectiveWidth <= 768) return "mobile";
    if (effectiveWidth <= 1024) return "tablet";
    return "desktop";
  }, [maxWidthPage]);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewport());
    };

    handleResize(); // Set awal saat mount

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [getViewport]);

  return viewport;
};
