import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { toDoContext } from '../App';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const EditToDo = () => {

    const { dispatch, state } = useContext(toDoContext);
    const { id } = useParams();

    const currentToDo = state.find((item) => item._id === id);
    const history = useHistory();
    const [title, setTitle] = useState(currentToDo.title);
    const [body, setBody] = useState(currentToDo.body);
    const [completed, setCompleted] = useState(currentToDo.completed);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const onBodyChange = (e) => {
        setBody(e.target.value);
    }

    const onCompletedChange = (e) => {
        setCompleted(e.target.checked);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (title !== '' && body !== '') {
            currentToDo.title = title;
            currentToDo.body = body;
            currentToDo.completed = completed;
            axios.patch(`https://todo-app-itachi.herokuapp.com/edit-todo/${currentToDo._id}`, currentToDo).then((res) => {
                dispatch({
                    type: 'EDIT_TO_DO',
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
                <h2 className="center"> Edit To Do</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="input-container">
                        <div className="input-title">
                            <TextField id="outlined-basic" value={title} onChange={(e) => onTitleChange(e)} label="Title" variant="outlined" />
                            {title === '' && (<span className="error">title is required</span>)}
                        </div>
                        <div className="input-body">
                            <TextField id="outlined-basic" value={body} onChange={(e) => onBodyChange(e)} label="Body" variant="outlined" />
                            {body === '' && (<span className="error">body is required</span>)}
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

export default EditToDo;