import McqComponent from "../component/McqComponent";
import Timer from "../component/Timer";

const QuizPage = () => {
  return (
    <section className="w-full min-h-screen flex justify-center flex-col items-center">
      <Timer />
      <McqComponent />
    </section>
  );
};

export default QuizPage;
