import { useState } from "react";

export default function AgeInput() {
  const [currentStep, setCurrentStep] = useState(0);

  const makeStep = (modifier) => {
    let newStep = currentStep;
    if (modifier === "+" && currentStep < 10) {
      newStep++;
    } else if (modifier === "-" && currentStep > 0) {
      newStep--;
    } else {
      return;
    }
    setCurrentStep(newStep);
  };

  return (
    <div className="ageInput-container">
      <input
        className="ageInput"
        type="number"
        value={currentStep}
        min="0"
        max="10"
        onClick={(e) => {
          e.target.value = "";
        }}
        onInput={(e) => {
          if (e.target.value !== "") {
            setCurrentStep(e.target.value);
          }
        }}
        onBlur={(e) => {
          e.target.value = currentStep;
        }}
      >
        {console.log(currentStep)}
      </input>
      <div className="ageInput__buttons">
        <button
          onClick={() => {
            makeStep("+");
          }}
          className="ageInput__buttons__stepHigher"
        >
          +
        </button>
        <button
          onClick={() => {
            makeStep("-");
          }}
          className="ageInput__buttons__stepLower"
        >
          -
        </button>
      </div>
    </div>
  );
}
