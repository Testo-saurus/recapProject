import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/color-form/ColorForm";
import { nanoid } from "nanoid";

import { useState } from "react";

function App() {
  const [colorInputs, setColorInputs] = useState(initialColors);

  // add Color Section (to state)
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

  //delete color (from state)
  function deleteColor(idToRemove) {
    console.log("Delete button clicked", idToRemove);

    setColorInputs(
      colorInputs.filter((color) => {
        return color.id !== idToRemove;
      })
    );
  }

  //update color (from state)

  function updateColor(updatedColor) {
    console.log("Update button clicked", updatedColor);

    // Update the color in the state array
    setColorInputs(
      colorInputs.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={addColorToState} />

      {colorInputs.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDelete={deleteColor}
            onUpdate={updateColor}
          />
        );
      })}
    </>
  );
}

export default App;
