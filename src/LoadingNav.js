import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import LensIcon from '@material-ui/icons/Lens';

const styles = {
    root: {
        flexGrow: 1,
    },
    AppBar: {
        background: 'white',
        color: 'gray',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function LoadingNav(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" style={styles.AppBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                        // component={PageLink}
                        // to={"/"}
                        >
                        상해봄
                    </Typography>
                    <IconButton>
                            <LensIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

LoadingNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingNav);