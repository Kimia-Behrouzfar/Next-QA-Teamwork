export default function Filter({ value, onChange }) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => onChange("newest")}
        className={`px-3 py-1 rounded ${
          value === "newest" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        New to Old
      </button>
      <button
        onClick={() => onChange("oldest")}
        className={`px-3 py-1 rounded ${
          value === "oldest" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Old to New
      </button>
    </div>
  );
}
