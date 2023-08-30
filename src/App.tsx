import { useEffect, useState } from "react";
import Toggle from "./toggle";
import "./App.css";

const lang = window.navigator.language === "ja" ? "ja" : "en";

function App() {
  const [toggleState, setToggleState] = useState({
    text: false,
    openBlock: false,
  });

  function sendContentJS(type: string, info: object) {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: any) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          JSON.stringify(Object.assign({ type: type }, info))
        );
      }
    );
  }

  useEffect(() => {
    sendContentJS("init", {});
  }, []);

  function handleToggleChange(key: string) {
    setToggleState((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }

  return (
    <div className="App bg-gray-700 h-screen text-white font-bold p-1">
      <div className="mt-[0.005rem] ml-[0.01rem]">
        <div className="flex">
          <span className="label">
            {lang === "ja" ? "EditText" : "EditText"}
          </span>
          <Toggle
            value={toggleState.text}
            onChange={() => handleToggleChange("text")}
            callback={() =>
              sendContentJS("text", { toggle: !toggleState.text })
            }
          />
        </div>

        <div className="flex">
          <span className="label">
            {lang === "ja" ? "OpenBlock" : "OpenBlock"}
          </span>
          <Toggle
            value={toggleState.openBlock}
            onChange={() => handleToggleChange("openBlock")}
            callback={() =>
              sendContentJS("openBlock", { toggle: !toggleState.openBlock })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
