import patternDesktop from "./assets/pattern-divider-desktop.svg";
import dice from "./assets/icon-dice.svg";
import { useEffect, useState, useRef } from "react";

function App() {
  const [id, setId] = useState(0);
  const [advice, setAdvice] = useState("");

  const clickButton = () => {
    const el = document.querySelector("#text");
    el.classList.remove("fade-in");
    el.classList.remove("fade-out");
    void el.offsetWidth;
    el.classList.add("fade-out");

    setTimeout(() => {
      fetchAdvice();
    }, 600);
  };

  const fadeIn = () => {
    // https://css-tricks.com/restart-css-animation/
    const el = document.querySelector("#text");
    el.classList.remove("fade-out");
    el.classList.remove("fade-in");
    void el.offsetWidth;
    el.classList.add("fade-in");
  };

  const fetchAdvice = async () => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        if (data.slip.id === id) {
          fetchAdvice();
          return;
        }
        setId(data.slip.id);
        setAdvice(data.slip.advice);
      });
  };

  useEffect(() => {
    fadeIn();
  }, [advice]);

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="bg-[#323A49] rounded-2xl flex flex-col items-center pt-8 px-8 mx-4">
      <div className="text-[#52FFA8] text-sm tracking-[0.2em] uppercase mb-4">
        Advice #{id}
      </div>
      <div
        id="text"
        className="text-white text-[1.75rem] text-center max-w-[29.5rem]"
      >
        {advice}
      </div>

      <img className="mt-8 mb-2" src={patternDesktop} alt="pattern divider" />

      <button
        id="button"
        onClick={(e) => clickButton(e)}
        className="bg-[#52FFA8] p-4 rounded-full relative top-6 scale-100 transition-transform hover:scale-90 hover:shadow-[0_0_50px_10px_#52FFA8] hover:shadow-[#52FFA8] hover active:scale-75"
      >
        <img src={dice} alt="dice" className="select-none" />
      </button>
    </div>
  );
}

export default App;
