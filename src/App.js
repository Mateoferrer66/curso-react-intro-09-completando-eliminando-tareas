import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';

const defaultTodos = [
  { text: ' Tomar Agua ', completed: true },
  { text: ' Tomar el Curso de React.js ', completed: false },
  { text: ' Hacer Ejercicio' , completed: false },
  { text: ' Montar en bicicleta ', completed: false },
];


function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);  //el .splice es para modificar el contenido de un arreglo para eliminarlo o modificar su contenido
    setTodos(newTodos);
  };
  
  return (
    <>
      <TodoCounter
        completed={completedTodos}
        total={totalTodos} 
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)} //encapsulacion de una arrowfuncion en una funcion 
            onDelete={() => deleteTodo(todo.text)}  //para que solo funciona cuando el evento se cumpla
          />//Funcion dentro de otra funcion para completar la logica para que el estado cambie
        ))}
      </TodoList>
      
      <CreateTodoButton />
    </>
  );
}

export default App;
