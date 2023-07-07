import React, { useState } from 'react';
import TodoForms from './TodoForms';
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'

function Todo({ todos, completeTodo,removeTodo,updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    level: ''
  })

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      level: ''
    });
  }

  if(edit.id){
    return <TodoForms edit={edit} onSubmit = {submitUpdate}/>
  }

  return todos.map((todo,index) => 
    <div
      className={(todo.isComplete ? 'todo-row complete ' : 'todo-row ') + todo.level}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text} <br /> <span className='date'>{todo.date}</span>
      </div>
      <div className='icons'>
        <RiCloseCircleLine
        onClick={() => removeTodo(todo.id)}
        className='delete-icon'/>
        <TiEdit
        className='edit-icon'
        onClick={()=> setEdit({id: todo.id, value:todo.text, level:todo.level})}/>
      </div>
    </div>
  )
}

export default Todo