import React, { useContext } from 'react';
import { toDoContext } from '../App';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import axios from 'axios';

const Item = () => {

    const history = useHistory();
    const { state, dispatch } = useContext(toDoContext);
    const { id } = useParams();
    const currentUser = state.find((item) => item._id === id);

    const onDelete = () => {
        axios.delete(`https://todo-app-itachi.herokuapp.com/delete-todo/${id}`).then((res) => {
            dispatch({
                type: "REMOVE_TO_DO",
                id: res.data._id
            })
        })
        history.push('/');
    }

    return (
        <div className="item-block">
            <div className="container">
                <IconButton
                    aria-label="Go back"
                    onClick={() => history.goBack()}
                >
                    <ArrowBackIcon />
                </IconButton>
                <h2 className="center">To Do</h2>
                <h4 className="title">Title :</h4>
                <p className="answer">{currentUser.title}</p>
                <br></br>
                <h4 className="title">Body :</h4>
                <p className="answer">{currentUser.body}</p>
                <br></br>
                <h4 className="title" style={{ display: "inline-flex" }}>Completed :</h4>
                <p className="answer" style={{ display: "inline-flex" }}>{currentUser.completed.toString()}</p>
                <br></br>
                <div className="center">
                    <div className="button-group">
                        <div className="button">
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => onDelete()}
                            >
                                Delete
                            </Button>
                        </div>
                        <div className="button">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => history.push(`/edit-todo/${id}`)}
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item