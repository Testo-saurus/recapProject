import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/color-form/ColorForm";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colorInputs, setColorInputs] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  // Api call to check if contrast is ok

  async function checkColorContrast(hexColor1, hexColor2) {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify({ colors: [hexColor1, hexColor2] }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("API response:", data);
    return data;
  }

  // add Color Section (to state)
  async function addColorToState(colorObj) {
    // Check contrast with the API and save result in contrastData Object
    const contrastData = await checkColorContrast(
      colorObj.hex,
      colorObj.contrastText
    );

    //add unique id
    const colorWithIdandContrast = {
      id: nanoid(),
      ...colorObj,
      overallContrastScore: contrastData.overall,
    };

    console.log("Data:", colorWithIdandContrast);

    setColorInputs((prev) => [colorWithIdandContrast, ...prev]);

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
