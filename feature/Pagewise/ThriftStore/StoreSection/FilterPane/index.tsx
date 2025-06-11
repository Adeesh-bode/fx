import { categoryOptions } from "../../FilterSection";

export default function FilterPane() {
  return (
    <div className="filter-pane-inner">
      <h3 className="filter-title">Categories</h3>
      <div className="filter-list">
        {categoryOptions.map(({ id, label }) => (
          <button key={id} className="filter-item">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
