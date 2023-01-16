import React from "react";
import PinInput from "react-pin-input";


export function PinInputContainer(props) {
  const { regex } = props;
  const handleComplete = (value) => {
    console.log(value);
  };

  return (
    <>
      <PinInput
        length={4}
        initialValue="0000"
        secret
        onChange={(_value, index) => {}}
        type="numeric"
        inputMode="number"
        style={{ padding: "10px" }}
        inputStyle={{ borderColor: "red" }}
        inputFocusStyle={{ borderColor: "blue" }}
        onComplete={(value) => handleComplete(value)}
        autoSelect={true}
        regexCriteria={regex}
        focus={true}
      />
    </>
  );
}
