import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/color-form/ColorForm";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [colorInputs, setColorInputs] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const initalThemesArr = [
    {
      name: "Default1",
      id: "d1",
      colors: initialColors,
    },
    {
      name: "Default2",
      id: "d2",
      colors: initialColors,
    },
  ];

  const [themesArr, setThemesArr] = useState(initalThemesArr);

  // state for active Theme
  const [activeThemeId, setActiveThemeId] = useState("d1");

  // grab ThemeID and update colors
  function handleThemeSelection(e) {
    const selectedThemeId = e.target.value;
    setActiveThemeId(selectedThemeId);

    // Find the selected theme and update colorInputs to match that theme's colors
    const selectedTheme = themesArr.find(
      (theme) => theme.id === selectedThemeId
    );
    if (selectedTheme) {
      setColorInputs(selectedTheme.colors);
    }

    console.log("Selected theme ID:", selectedThemeId);
  }

  // Update a theme's colors when colorInputs changes
  useEffect(() => {
    // Update the active theme's colors when colorInputs changes
    setThemesArr((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId ? { ...theme, colors: colorInputs } : theme
      )
    );
  }, [colorInputs, activeThemeId]);

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

      <ColorForm
        onAddColor={addColorToState}
        onChangeTheme={handleThemeSelection}
        themesArr={themesArr}
      />

      {/* Use colorInputs directly since we're syncing it with the active theme */}
      {colorInputs.map((color) => (
        <Color
          key={color.id}
          color={color}
          onDelete={deleteColor}
          onUpdate={updateColor}
        />
      ))}
    </>
  );
}

export default App;
