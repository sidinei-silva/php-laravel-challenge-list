import React from 'react';
import {TextField, Grow, Grid, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const defaultSearchStyles = theme => ({
    main: {
        display: 'flex',
        flex: '1 0 auto',
    },
    searchText: {
        flex: '0.8 0',
    },
    clearIcon: {
        '&:hover': {
            color: theme.palette.error.main,
        },
    },
});


class CustomSearchRender extends React.Component {

    render() {

        const { classes, options, onHide, searchText, sendSearch, onSearch } = this.props;

        return (
            <Grow appear in={true} timeout={300}>
                <div className={classes.main} ref={el => (this.rootRef = el)}>
                   <Grid container spacing={2} alignItems={"flex-end"}>
                       <Grid item md={8}>
                           <TextField
                               placeholder={'Search by name and ref'}
                               className={classes.searchText}
                               InputProps={{
                                   'aria-label': options.textLabels.toolbar.search,
                               }}
                               value={searchText || ''}
                               fullWidth={true}
                               inputRef={el => (this.searchField = el)}
                               onChange={
                                   (event) => {onSearch(event.target.value)}
                               }
                           />
                       </Grid>
                       <Grid item >
                           <Button variant={"contained"} size={"small"} color={"primary"}
                                   onClick={
                                       () => {sendSearch(searchText)}
                                   }
                           >
                               Search
                           </Button>
                       </Grid>
                   </Grid>
                </div>
            </Grow>
        );
    }
}

export default withStyles(defaultSearchStyles, { name: 'CustomSearchRender' })(CustomSearchRender);
