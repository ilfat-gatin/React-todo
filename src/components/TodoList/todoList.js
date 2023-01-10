import { useEffect, useRef, useState } from "react";
import { TodoItem } from "../TodoItem/todoItem"
import classes from './todoList.module.css'
import { List, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle  } from "@mui/material/";
import { nanoid } from 'nanoid'


export const TodoList = () => {
    const [todoList, setTodoList] = useState([])
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')

    const scrollRef = useRef()

    useEffect(() => {                   
        fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
        .then(response => response.json())
        .then((json) => {
            setTodoList((state) => [...state, ...json],)
        })
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
        }
      }, [todoList])

    const addNewToDo = () => {
        if (text) {
          const arr = todoList
          arr.push({
            title: text,
            id: arr.length + 1,
            completed: false
        })
          setTodoList(arr)
        }
    }

    const onComplete = (key) => {
      const arr = todoList
      arr.forEach(item => {
        if (item.id === key+1) {
          item.completed = !item.completed
        }
      })
      setTodoList(arr)
    }

    const onDelete = (key) => {
      const arr = todoList.filter(item => item.id !== key+1)
      setTodoList(arr)
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
                return <TodoItem text={item.title} completed={item.completed} key={nanoid()} onDelete={onDelete} onComplete={onComplete} id={idx}/>
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