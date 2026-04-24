export default function Card({ todo, onDelete, onToggle }) {
  return (
    <div className="card">
      <span className={todo.allapot ? "done" : ""}>
        {todo.tev_nev}
      </span>

      <div className="actions">
        <button onClick={onToggle}>✔</button>
        <button onClick={onDelete}>✖</button>
      </div>
    </div>
  );
}