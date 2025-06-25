import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/color-form/ColorForm";
import ColorInput from "./Components/Color/color-form/color-input/ColorInput";
import { nanoid } from "nanoid";

import { useState } from "react";

function App() {
  const [colorInputs, setColorInputs] = useState(initialColors);

  function addColorToState(colorObj) {
    //add unique id
    const colorWithId = {
      id: nanoid(),
      ...colorObj,
    };

    console.log("Data:", colorWithId);

    setColorInputs((prev) => [colorWithId, ...prev]);

    console.log("Data in State :", colorInputs);
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={addColorToState} />

      <ColorInput colorInputs={colorInputs} />

      {colorInputs.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
