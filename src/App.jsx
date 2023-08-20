import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [IncompleteTodos, SetIncompleteodos] = useState([]);
  const [CompleteTodos, SetCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickTodoAdd = () => {
    if (todoText === "") return;
    const newTodos = [...IncompleteTodos, todoText];
    SetIncompleteodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...IncompleteTodos];
    newTodos.splice(index, 1);
    SetIncompleteodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...IncompleteTodos];
    newInCompleteTodos.splice(index, 1);
    SetIncompleteodos(newInCompleteTodos);
    const newCompleteTodos = [...CompleteTodos, IncompleteTodos[index]];
    SetCompleteTodos(newCompleteTodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodos = [...CompleteTodos];
    newCompleteTodos.splice(index, 1);
    const newInCompleteTodos = [...IncompleteTodos, CompleteTodos[index]];
    SetCompleteTodos(newCompleteTodos);
    SetIncompleteodos(newInCompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickTodoAdd}
      />
      <IncompleteTodos
        todos={IncompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <div className="complete-area">
        <p className="title">完了したToDo</p>
        <ul>
          {CompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li> {todo} </li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
