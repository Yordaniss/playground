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
        defaultValue={currentStep}
        min="0"
        max="10"
      />
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
