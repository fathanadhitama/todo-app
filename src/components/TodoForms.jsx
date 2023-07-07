import React, { useState,useEffect,useRef } from 'react'
import styles from './TodoForms.module.css'

function TodoForms(props) {
const [input,setInput] = useState(props.edit ? props.edit.value : '')
const [level,setLevel] = useState(props.edit ? props.edit.level : '')

const inputRef = useRef(null);

const radios = document.querySelectorAll('input');

useEffect(() => {
    //auto-focusing on textfield
    inputRef.current.focus()
})

const handleChange = e => {
    let txt = e.target.value;
    setInput(txt);
}

const handleLevel = e => {
    let val = e.target.value
    setLevel(val)
}

const handleSubmit = e => {
    e.preventDefault();
    const date = new Date();

    radios.forEach(radio => {
        radio.checked = false
    });

    props.onSubmit({ //props means properties of <TodoForms> such as onSubmit, onClick
        id:Math.floor(Math.random() *10000),
        text:input,
        level:level,
        date: date.toLocaleDateString()
    });


    setInput('');
    setLevel('');

}

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
        {props.edit ? ( 
        <>
        <div className={styles.inputs} > 
            <input // form if it's in editing mode
                className='todo-input'
                type="text"
                placeholder='Update your plan...'
                value={input}
                name='text'
                onChange={handleChange}
                ref={inputRef}
            />
            <button className='todo-btn' name='add' disabled={!level || !input}> Update </button>
        </div>
        
        <br />

        <div className={styles.radios}>
            <div className={styles.option}>
                <input type="radio" id="edit-critical" name="level" onChange={handleLevel} value="critical" checked={level==='critical'}/>
                <label for="edit-critical">Critical</label>
            </div>
            <div className={styles.option}>
                <input type="radio" id="edit-normal" name="level" onChange={handleLevel} value="normal" checked={level==="normal"}/>
                <label for="edit-normal">Normal</label>
            </div>
            <div className={styles.option}>
                <input type="radio" id="edit-info" name="level" onChange={handleLevel} value="info" checked={level==="info"}/>
                <label for="edit-info">Info</label>
            </div>
        </div>
        </>
        ) : ( 
        <>
        <div className={styles.inputs}> 
            <input //normal form
                className='todo-input'
                type="text"
                placeholder='Add a todo...'
                value={input}
                name='text'
                onChange={handleChange}
                ref={inputRef}
            />
            <button className='todo-btn' disabled={!level || !input} name='add'>Add Todo</button>
        </div>

        <br />

        <div className={styles.radios}>
            <div className={styles.option}>
                <input type="radio" id="critical" name="level" onChange={handleLevel} value="critical"/>
                <label for="critical">Critical</label>
            </div>
            <div className={styles.option}>
                <input type="radio" id="normal" name="level" onChange={handleLevel} value="normal"/>
                <label for="normal">Normal</label>
            </div>
            <div className={styles.option}>
                <input type="radio" id="info" name="level" onChange={handleLevel} value="info"/>
                <label for="info">Info</label>
            </div>
        </div>
        </>
        ) }
        

    </form>
  )
}

export default TodoForms