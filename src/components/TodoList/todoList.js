import { useEffect, useRef, useState } from "react";
import { TodoItem } from "../TodoItem/todoItem"
import classes from './todoList.module.css'
import { List, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle  } from "@mui/material/";
import { nanoid } from 'nanoid'
import axios from "axios";


export const TodoList = () => {
    const [todoList, setTodoList] = useState([])
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')

    const scrollRef = useRef()

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then( ({data}) => setTodoList((state) => [...state, ...data]))
      .catch( error => console.log(error))
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
        }
    }, [todoList])

    const addNewToDo = () => {
        if (text) {
          setTodoList([...todoList, {
              title: text,
              id: nanoid(),
              completed: false
          }])
        }
    }

    const onComplete = (id) => {
      const arr = todoList
      arr.forEach(item => {
        if (item.id === id) {
          item.completed = !item.completed
        }
      })
      setTodoList(arr)
    }

    const onDelete = (id) => {
      setTodoList(() => todoList.filter(item => item.id !== id))
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        setText('')
      };

    return <div>
        <List className={classes.list} ref={scrollRef}>
            {todoList.map((item, idx) => {
                return <TodoItem text={item.title} completed={item.completed} key={nanoid()} onDelete={onDelete} onComplete={onComplete} id={item.id}/>
            })}            
        </List>
        <Button className={classes.btn} variant="contained" onClick={handleClickOpen}>Add</Button> 
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new case</DialogTitle>
        <DialogContent>
          <TextField
            // autoFocus
            margin="dense"
            id="text"
            label="Enter new case"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {setText(event.target.value)}}
          />
        </DialogContent>
        <DialogActions> 
          <Button onClick={() => {
            addNewToDo()
            handleClose()
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
}