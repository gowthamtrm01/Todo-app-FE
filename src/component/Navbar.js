import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" >
                    To-do app
                </Typography>
                <Link className="create-link" to="add-todo">
                    <Typography variant="h6" >
                        Create To-Do
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;