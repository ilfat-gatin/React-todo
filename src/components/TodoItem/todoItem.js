import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Checkbox } from "@mui/material"
import classes from "./todoItem.module.css"
import { useState } from 'react';

export const TodoItem = (props) => {

    const [checked, setChecked] = useState(props.completed)
    
    return <div className={classes.wrapper}>
        <ListItem disablePadding onClick={() => {setChecked(()=> !checked)}}>
            <ListItemButton >
              <ListItemText className={ checked ? classes.crossed : '' } primary={props.text} />
              <Checkbox checked={checked}/>
            </ListItemButton>
        </ListItem>
        
    </div>
}