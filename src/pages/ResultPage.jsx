import React, { useEffect, useState } from "react";
import { loadFromLocalStorage } from "../utils/handleFormReload";

const ResultPage = () => {
  const [result, setResult] = useState(
    () => loadFromLocalStorage("totalRightAns") || 0
  );

  const getResultMessage = (result) => {
    if (result >= 0 && result <= 4) {
      return "😔";
    } else if (result > 4 && result <= 7) {
      return "😐";
    } else {
      return "🤩";
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div>
        <h1 className="md:text-8xl text-4xl">
          {result}/10 {getResultMessage(result)}
        </h1>
      </div>
    </section>
  );
};

export default ResultPage;
