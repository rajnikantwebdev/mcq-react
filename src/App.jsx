import { createBrowserRouter } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import { Link } from "react-router-dom";
import ResultPage from "./pages/ResultPage";
import TimeOver from "./pages/TimeOver";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/time-over",
    element: <TimeOver />,
  },
]);

function App() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="px-2 py-4 min-h-36 text-center">
        <Link
          to={"/quiz"}
          className="text-4xl mb-16 text-thirty hover:text-blue-800"
        >
          Click me to start the quiz.
        </Link>
        <br />
        <div className="text-sm text-ten mt-4">
          There will be total 10 questions with 10 minutes to finish.
        </div>

        <div>Best of luck.</div>
      </div>
    </section>
  );
}

export default App;
