import React, { useState, useEffect } from 'react';
import TodoForms from './TodoForms';
import Todo from './Todo';
import SearchBar from './SearchBar';
import styles from './TodoList.module.css';

function TodoList() {
    const [todos,setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos);
        setEntriesToStorage(newTodos);
    }

    const updateTodo = (todoId, value) => {
        if(!value || /^\s*$/.test(value)){
            return;
        }

        let updatedTodos = prev => prev.map(item => (item.id === todoId ? value : item)); 
        setTodos(updatedTodos);
        setEntriesToStorage(updatedTodos);
    }

    const removeTodo = id => {
        let updatedTodos = [...todos].filter(todo => todo.id!==id)
        setTodos(updatedTodos)
        setEntriesToStorage(updatedTodos);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const searchTodo = (txt) => {
        let updatedTodos = todos.filter(todo => todo.text === txt);
        if(txt){
            setTodos(updatedTodos)
        }else{
            setTodos(getEntriesFromStorage());
        }
    } 

    //local storage usage
    const getEntriesFromStorage = () => JSON.parse(
        window.localStorage.getItem('journalEntries')
    );

    const setEntriesToStorage = items => 
      window.localStorage.setItem('journalEntries', JSON.stringify(items));
      useEffect(() => {
        const entriesFromStorage = getEntriesFromStorage();
        if(entriesFromStorage) {
          setTodos(entriesFromStorage);
        }
        }, []);

  return (
    <div>
        <TodoForms onSubmit={addTodo}/>
        <div className={styles.todoWrapper}>
            <Todo todos = {todos} completeTodo = {completeTodo} 
            removeTodo={removeTodo} updateTodo = {updateTodo}/>
        </div>
    </div>
  )
}

export default TodoList