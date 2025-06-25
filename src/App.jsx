import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/Color/color-form/ColorForm";
import ColorInput from "./Components/Color/color-form/color-input/ColorInput";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm />

      <ColorInput />

      {initialColors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
