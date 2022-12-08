import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostActions } from "../../../store/index";

export default function AgeInput(props) {
  const touchedFieldsRedux = useSelector(
    ({ addPost }) => addPost.touchedFields
  );
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const changeAge = (value) => {
    dispatch(
      addPostActions.changeAge({
        value: value,
      })
    );
  };
  const setAsTouched = () => {
    const isAlreadyTouched = touchedFieldsRedux.some((field) => {
      return field === "age_category";
    });
    if (!isAlreadyTouched) {
      dispatch(addPostActions.addTouchedField("age_category"));
    }
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
    <div className={`ageInput-container ${props.className}`}>
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
          setAsTouched();
        }}
      ></input>
      <div className="ageInput__buttons">
        <button
          type="button"
          onClick={() => {
            makeStep("+");
            setAsTouched();
          }}
          className="ageInput__buttons__stepHigher"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            makeStep("-");
            setAsTouched();
          }}
          className="ageInput__buttons__stepLower"
        >
          -
        </button>
      </div>
    </div>
  );
}
