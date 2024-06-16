import React, { useEffect, useContext } from "react";
import { TimeContext } from "../utils/TimeContext";

import { useFullScreen } from "../utils/useFullScreen";
const Timer = () => {
  const { time, setTime } = useContext(TimeContext);
  const { isFullscreen } = useFullScreen();

  useEffect(() => {
    if (!isFullscreen) return;
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem("remainingTime", newTime); // Save the new time to localStorage
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerId);
    // Clear the interval on component unmount
  }, [isFullscreen, setTime]);

  useEffect(() => {
    // Clean up localStorage when the timer reaches 0
    if (time === 0) {
      localStorage.removeItem("remainingTime");
    }
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      <div>{formatTime(time)}</div>
    </div>
  );
};

export default Timer;
