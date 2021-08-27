import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useContext } from 'react';
import { toDoContext } from '../App';
import { Button } from '@material-ui/core';
import axios from 'axios';

const PopUp = ({ openPopUp, setOpenPopUp }) => {

    const { dispatch } = useContext(toDoContext)

    const onSubmit = () => {
        axios.delete("https://todo-app-itachi.herokuapp.com/delete-all-todo/").then((res) => {
            dispatch({ type: "DELETE_ALL" })
        });
        setOpenPopUp(false);
    }

    return (
        <Dialog open={openPopUp}>
            <DialogTitle>
                <div>Alert</div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    <p>Are you sure want to delete all item ?</p>
                    <br></br>
                    <div className="button-group">
                        <div className="button">
                            <Button
                                onClick={() => onSubmit()}
                                variant="contained"
                                color="primary"
                            >Yes</Button>
                        </div>
                        <div className="button">
                            <Button
                                onClick={() => setOpenPopUp(false)}
                                variant="contained"
                                color="secondary"
                            >No</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PopUp;