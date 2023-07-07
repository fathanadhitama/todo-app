import React, { useState } from 'react'
import styles from './SearchBar.module.css'
import {GrClose} from 'react-icons/gr'

function SearchBar({searchTodo}) {
    const [key, setKey] = useState('');

    const handleChange = e => {
        const input = e.target.value;
        setKey(input);
        searchTodo(key);
    }
  return (
    <div className={styles.wrapper} onChange={handleChange}>
        <input className={styles.search} type="text" placeholder='Search...'/>
        <GrClose className={styles.close} color="white"/>
    </div>
  )
}

export default SearchBar