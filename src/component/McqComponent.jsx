import React, { useContext, useEffect, useState } from "react";
import mcq from "../utils/mcq.json";
import { TimeContext } from "../utils/TimeContext";
import { handleAnswerValidation } from "../utils/useAnswerValidation";
import Modal from "react-modal";
import { useFullScreen } from "../utils/useFullScreen";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/handleFormReload";
import { useNavigate } from "react-router-dom";
import { exitFullscreen } from "../utils/exitFullScreen";

Modal.setAppElement("#root");

const McqComponent = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(mcq || []);
  const [currentQuizId, setCurrentQuizId] = useState(
    loadFromLocalStorage("currentQuizId") || 0
  );
  const [selectedOptions, setSelectedOptions] = useState(
    loadFromLocalStorage("selectedOptions") || []
  );
  const [totalRightAns, setTotalRightAns] = useState(
    loadFromLocalStorage("total") || 0
  );
  const { time } = useContext(TimeContext);
  const { isFullscreen, requestFullscreen } = useFullScreen();

  const currentQuestion = quiz[currentQuizId];
  const currentSelectedOption = selectedOptions[currentQuizId] || null;

  const handleOptionChange = (optionId) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuizId] = optionId;
    setSelectedOptions(updatedOptions);
    saveToLocalStorage("selectedOptions", updatedOptions);
  };

  const handleNext = async (rightAnswer) => {
    await handleAnswerValidation(rightAnswer, selectedOptions[currentQuizId], {
      setTotalRightAns,
    });

    if (quiz.length - 1 === currentQuizId) {
      exitFullscreen();
      navigate("/result");
      return;
    }

    const newQuizId = currentQuizId + 1;
    setCurrentQuizId(newQuizId);
    saveToLocalStorage("currentQuizId", newQuizId);
  };

  const handlePrevious = () => {
    const newQuizId = currentQuizId - 1;
    setCurrentQuizId(newQuizId);
    saveToLocalStorage("currentQuizId", newQuizId);
  };

  useEffect(() => {
    if (time === 0 && currentQuizId <= mcq.length - 1) {
      exitFullscreen();
      navigate("/time-over");
    }
  }, [time, currentQuizId]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1rem",
    },
  };

  return (
    <div>
      <Modal
        isOpen={!isFullscreen}
        contentLabel="Enable Fullscreen"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        style={customStyles}
      >
        <button onClick={requestFullscreen} className="text-3xl">
          <span className="text-thirty hover:text-blue-800">
            Please click me to enable fullscreen mode to take the quiz.
          </span>
        </button>
        {/* <button
          onClick={requestFullscreen}
          className="bg-thirty px-2 py-1 rounded-md
         text-white my-4"
        >
          Enable Fullscreen
        </button> */}
      </Modal>

      {isFullscreen && (
        <div className="px-4 py-5 shadow-lg w-[30rem]">
          <div className="text-xl flex gap-2">
            <span>{currentQuestion.question_number}. </span>
            <span>{currentQuestion.question}</span>
          </div>
          <div className="flex flex-col gap-5 my-8 w-full">
            {currentQuestion.options.map((o) => {
              return (
                <div
                  key={o.option_id}
                  className={`w-full border py-2 px-4 cursor-pointer ${
                    currentSelectedOption === o.option_id &&
                    "bg-blue-400 bg-opacity-20"
                  }`}
                  onClick={() => handleOptionChange(o.option_id)}
                >
                  <input
                    type="radio"
                    name="option"
                    id={o.option_id}
                    checked={currentSelectedOption === o.option_id}
                    onChange={() => handleOptionChange(o.option_id)}
                    className="hidden"
                  />
                  <label htmlFor={o.option_id}>{o.option_name}</label>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={handlePrevious} disabled={currentQuizId === 0}>
              Previous
            </button>
            <button
              className="bg-thirty text-white px-3 py-1"
              onClick={() => handleNext(currentQuestion.answer)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqComponent;
