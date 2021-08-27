import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { toDoContext } from '../App';
import ListItem from './List-item';
import PopUp from './PopUp';



const HomePage = () => {

    const { state, dispatch } = useContext(toDoContext);
    const [hideCompleted, setHideCompleted] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false)

    const deleteAll = () => {
        // dispatch({ type: "DELETE_ALL" })
        setOpenPopUp(true);
    }


    const onSearchChange = (e) => {
        const value = e.target.value;
        if (value) {
            const modifiedArray = state.map((item) => {
                if (!item.title.toLowerCase().includes(value.toLowerCase())) {
                    item.hide = true;
                    return item;
                }
                return item
            });
            dispatch({
                type: "SEARCH_TO_DO",
                payload: modifiedArray
            });
        } else {
            const allItem = state.map((item) => {
                item.hide = false;
                return item;
            });
            dispatch({
                type: "SEARCH_TO_DO",
                payload: allItem
            });
        }
    }

    const onHideChange = (e) => {
        const value = e.target.checked;
        setHideCompleted(value);
        if (value) {
            const modifiedData = state.map((item) => {
                if (item.completed) {
                    item.hide = true;
                    return item
                }
                return item
            })

            dispatch({
                type: "SEARCH_TO_DO",
                payload: modifiedData
            })
        } else {
            const allData = state.map((item) => {
                item.hide = false;
                return item;
            })
            dispatch({
                type: "SEARCH_TO_DO",
                payload: allData
            })

        }
    }

    return (
        <div className="home-page">
            <div className="container">
                <div className="filter-group">
                    <div className="searchBar">
                        <TextField id="outlined-basic" autoComplete="off" label="Search" onChange={(e) => onSearchChange(e)} variant="outlined" />
                    </div>
                    <FormControlLabel
                        className="switch"
                        label="Hide Completed"
                        control={<Switch color="primary" checked={hideCompleted} onChange={(e) => onHideChange(e)} />}
                    />
                    <div className="delete-all">
                        <Button
                            onClick={() => deleteAll()}
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        >
                            Delete-All
                        </Button>
                    </div>
                </div>
                <h2 className="center">To Do List</h2>
            </div>
            <div className="container">
                {state.length > 0 ? state.map((item, index) => {
                    if (item.hide) {
                        return undefined;
                    } else {
                        return (
                            <ListItem key={index} title={item.title} id={item._id} />
                        )
                    }
                }) : (<h3 className="center title">No data</h3>)}
            </div>
            <PopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
        </div>
    );
}

export default HomePage;