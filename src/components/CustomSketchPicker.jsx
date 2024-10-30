"use client";

import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

const CustomSketchPicker = ({ color = "#ffffff", onChangeComplete }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <SketchPicker color={color} onChangeComplete={onChangeComplete} />;
};

export default CustomSketchPicker;
