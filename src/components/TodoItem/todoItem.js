import * as React from 'react';
import { Checkbox, ListItem, ListItemButton, ListItemText, IconButton, SvgIcon } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import classes from "./todoItem.module.css"
import { useState } from 'react';

export const TodoItem = ({id, completed, text, onDelete, onComplete}) => {

    const [checked, setChecked] = useState(completed)

    const handleDelete = () => {        
        onDelete(id)
    }

    const handleClick = () => {
        setChecked(() => !checked)
        onComplete(id)
    }
    
    return <div className={classes.wrapper}>
        <ListItem disablePadding >
            <div className={classes.listitem_wrapper}>
                <ListItemButton onClick={() => {handleClick()}}>
                    <Checkbox checked={checked}/>
                    <ListItemText className={ checked ? classes.crossed : '' } primary={text} />             
                </ListItemButton>
                <IconButton onClick={handleDelete}>                    
                    <DeleteIcon />
                </IconButton> 
            </div> 
        </ListItem>
        
    </div>
}