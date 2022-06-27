import classes from './header.module.css'
import moment from 'moment'

export const Header = () => {
    const day = moment().format("DD")
    const month = moment().format('MMM')
    const year = moment().format("YYYY")
    const weekday = moment().format('dddd')


    return <div className={classes.container}>
        <div className={classes.date_wrapper}>
            <div className={classes.day}>{day}</div>
            <div>
                <div className={classes.month_year}>{month}</div>
                <div className={classes.month_year}>{year}</div>
            </div>
        </div>
        <div className={classes.weekday}>{weekday}</div>
    </div>
}