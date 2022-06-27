import { useEffect, useRef, useState } from "react";
import { TodoItem } from "../TodoItem/todoItem"
import List from '@mui/material/List';
import classes from './todoList.module.css'
import { Button } from "@mui/material/";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

    const addNewMessage = () => {
        if (text) {
            setTodoList((state) => [
                ...state,            
                {
                    title: text,
                    id: nanoid(),
                    completed: false
                }            
            ])
        }
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
            {todoList.map(item => {
                return <TodoItem text={item.title} completed={item.completed} key={nanoid()}/>
            })}            
        </List>
        <Button className={classes.btn} variant="contained" onClick={handleClickOpen}>Add</Button> 
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new case</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
            addNewMessage()
            handleClose()
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
}