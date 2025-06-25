import { useState } from "react";

export default function ColorForm() {
  const [colorInputs, setColorInputs] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());

    console.log("Data:", dataObject);

    setColorInputs((prev) => [...prev, dataObject]);

    console.log("Data in State :", colorInputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="role">Role </label>
        <input type="text" name="role" id="" placeholder="some color" />
      </div>

      <div>
        <label htmlFor="hex">Hex </label>
        <input type="text" name="hex" id="" placeholder="#123456" />
        <input type="color" name="colorPicker" id="" />
      </div>

      <div>
        <label htmlFor="colorPicker">Contrast Text </label>
        <input type="text" name="colorPicker" id="" placeholder="#ffffff" />
        <input type="color" name="colorPicker" id="" />
      </div>
      <button type="submit">Add Color</button>
    </form>
  );
}
