export default function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search questions..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}
