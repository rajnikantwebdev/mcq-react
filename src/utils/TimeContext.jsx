import { createContext, useState } from "react";

export const TimeContext = createContext(0);

const Reducer = ({ children }) => {
  const [time, setTime] = useState(() => {
    // Retrieve the saved time from localStorage
    const savedTime = localStorage.getItem("remainingTime");
    return savedTime !== null ? parseInt(savedTime, 10) : 30; // Default to 10 minutes if not found
  });

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};

export default Reducer;
