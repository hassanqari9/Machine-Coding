export function Profile({ form, onFormChange }) {
  return (
    <div>
      <h1>Profile</h1>
      <input
        value={form.name}
        onChange={(e) => onFormChange("name", e.target.value)}
        type="text"
        placeholder="name"
      />
      <input
        value={form.age}
        onChange={(e) => onFormChange("age", e.target.value)}
        type="text"
        placeholder="age"
      />
      <input
        value={form.email}
        onChange={(e) => onFormChange("email", e.target.value)}
        type="email"
        placeholder="email"
      />
    </div>
  );
}
