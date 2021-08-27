import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const ListItem = ({ title, id }) => {

    const history = useHistory();

    return (
        <Link className="list-item" to={`${id}`}>
            <h4 className="title">{title}</h4>
            <IconButton
                aria-label="delete"
                onClick={() => history.push(`edit-todo/${id}`)}
            >
                <EditIcon />
            </IconButton>
        </Link>
    )
}

export default ListItem