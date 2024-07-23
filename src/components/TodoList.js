import React, { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todo_list")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data);
    }
  };

  const addTodo = async () => {
    const { data, error } = await supabase
      .from("todo_list")
      .insert([{ todo: newTodo }])
      .select(); // .select() を追加して挿入されたデータを取得

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      // dataが配列であることを確認し、data[0]が存在するかどうかをチェック
      if (data && data.length > 0) {
        setTodos([data[0], ...todos]);
        setNewTodo("");
      }
    }
  };

  return (
    <div>
      <h1>Todo List supa</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
