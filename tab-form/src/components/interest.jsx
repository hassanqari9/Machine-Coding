export function Interest({ form, onFormChange }) {
  return (
    <div>
      <h1>Interest</h1>
      <input
        value={form.interest}
        onChange={(e) => onFormChange("interest", e.target.value)}
        type="text"
        placeholder="Interest"
      />
    </div>
  );
}
