"use client";
import { useState, useEffect } from "react";

export const useViewportWidth = (threshold: number = 768): boolean => {
  const [isWide, setIsWide] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > threshold);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  return isWide;
};
