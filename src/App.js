import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Layout from "./components/Layout";
import Cards from "./contexts/Cards";
import "./App.css";

const API = "http://localhost:8000/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [katId, setKatId] = useState("1");

  const loadTodos = async () => {
    const res = await fetch(`${API}/tevekenysegek`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;

    await fetch(`${API}/tevekenyseg`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kat_id: katId,
        tev_nev: text,
        allapot: 0,
      }),
    });

    setText("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/tevekenyseg/${id}`, { method: "DELETE" });
    loadTodos();
  };

  const toggleTodo = async (todo) => {
    await fetch(`${API}/tevekenyseg/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        allapot: todo.allapot ? 0 : 1,
      }),
    });
    loadTodos();
  };

  return (
    <>
      <Nav />

      <Layout>
        <div className="add">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Új tevékenység"
          />

          <select onChange={(e) => setKatId(e.target.value)}>
            <option value="1">Házimunka</option>
            <option value="2">Iskolai</option>
            <option value="3">Egyéb</option>
          </select>

          <button onClick={addTodo}>+</button>
        </div>

        <div className="grid">
          <Cards
            title="Házimunka"
            todos={todos.filter(t => t.kat_id == 1)}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
          <Cards
            title="Iskolai"
            todos={todos.filter(t => t.kat_id == 2)}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
          <Cards
            title="Egyéb"
            todos={todos.filter(t => t.kat_id == 3)}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        </div>
      </Layout>

      <footer>Nádas Viktória Mária</footer>
    </>
  );
}

export default App;