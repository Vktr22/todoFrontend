import Card from "./Card";

export default function Cards({ title, todos, onDelete, onToggle }) {
  return (
    <div className="cards">
      <h2>{title}</h2>

      {todos.map(todo => (
        <Card
          key={todo.id}
          todo={todo}
          onDelete={() => onDelete(todo.id)}
          onToggle={() => onToggle(todo)}
        />
      ))}
    </div>
  );
}