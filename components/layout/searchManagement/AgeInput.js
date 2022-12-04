import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostActions } from "../../../store/index";

export default function AgeInput(props) {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  let className = "ageInput-container";
  if (props.className) {
    className = "ageInput-container " + props.className;
  }

  const changeAge = (value) => {
    dispatch(
      addPostActions.changeAge({
        value: value,
      })
    );
  };

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
    changeAge(newStep);
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
          changeAge(currentStep);
        }}
      ></input>
      <div className="ageInput__buttons">
        <button
          type="button"
          onClick={() => {
            makeStep("+");
          }}
          className="ageInput__buttons__stepHigher"
        >
          +
        </button>
        <button
          type="button"
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
