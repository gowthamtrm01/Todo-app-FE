import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { toDoContext } from '../App';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const AddToDo = () => {

    const history = useHistory();
    const { dispatch } = useContext(toDoContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [completed, setCompleted] = useState(false);
    const [errTitle, setErrTitle] = useState(false);
    const [errBody, setErrBody] = useState(false);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
        if (errTitle) {
            setErrTitle(false);
        }
    }

    const onBodyChange = (e) => {
        setBody(e.target.value);
        if (errBody) {
            setErrBody(false);
        }
    }

    const onCompletedChange = (e) => {
        setCompleted(e.target.checked);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            setErrTitle(true);
        }
        if (body === '') {
            setErrBody(true);
        }
        if (title !== '' && body !== '') {
            const todo = {};
            todo.title = title;
            todo.body = body;
            todo.completed = completed;
            todo.hide = false;
            axios.post("https://todo-app-itachi.herokuapp.com/add-todo", todo).then((res) => {
                dispatch({
                    type: "ADD_TO_DO",
                    payload: res.data
                })
            })
            history.push('/');
        }
    }

    return (
        <div>
            <div className="container">
                <IconButton
                    aria-label="Go back"
                    onClick={() => history.goBack()}
                >
                    <ArrowBackIcon />
                </IconButton>
                <h2 className="center"> Add To Do</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="input-container">
                        <div className="input-title">
                            <TextField id="outlined-basic" onChange={(e) => onTitleChange(e)} label="Title" variant="outlined" />
                            {errTitle && (<span className="error">title is required</span>)}
                        </div>
                        <div className="input-body">
                            <TextField id="outlined-basic" onChange={(e) => onBodyChange(e)} label="Body" variant="outlined" />
                            {errBody && (<span className="error">body is required</span>)}
                        </div>
                        <label>
                            Completed
                            <Checkbox checked={completed} onChange={(e) => onCompletedChange(e)} color="primary" />
                        </label>
                        <div className="center">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddToDo;