import ColorForm from "../Color/color-form/ColorForm";

export default function EditColorForm({ onUpdate, color, isEditOpen }) {
  function handleSubmit(updatedColorData) {
    // Preserve the ID when updating
    onUpdate({
      id: color.id,
      ...updatedColorData,
    });
  }

  return (
    <ColorForm
      onAddColor={handleSubmit}
      isEditOpen={isEditOpen}
      colorToEdit={color}
    />
  );
}
