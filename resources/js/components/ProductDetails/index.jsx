import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
    NumberFormatCustom,
} from './form/masks';

import {
    TextField,
    InputLabel,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Switch,
    Box,
    Paper,
    Chip,
    Button
} from "@material-ui/core";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import Snackbar from "../Snackbar";
import {useSnackbar} from "notistack";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        maxHeight: 300
    },
    listSection: {
        backgroundColor: "inherit"
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0
    }
}));



const allCategories = [
    {"name" : "e-shop", "children_of" : null},
    {"name" : "clothes", "children_of" : "e-shop"},
    {"name" : "t-shirt", "children_of" : "clothes"},
    {"name" : "tops", "children_of" : "clothes"},
    {"name" : "shoes", "children_of" : "clothes"},
    {"name" : "accessory", "children_of" : "e-shop"},
    {"name" : "bags", "children_of" : "accessory"}];

function ProductDetails(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const {productid: productId} = props

    const [product, setProduct] = React.useState(null);


    const handleToggle = (category) => () => {
        const nameCategoriesSelected = product.category.map(category => category.name);

        if(nameCategoriesSelected.includes(category.name)){
            let newCategories = product.category.filter(c => c.name !== category.name)

            setProduct({...product, category: newCategories});
        }else{
            let newCategories = [...product.category, category];
            setProduct({...product, category: newCategories})
        }
    };

    const checkedCategory = (category) =>{
        const categoriesSelected = product.category.map(category => category.name);
        return !!(categoriesSelected.includes(category.name));
    }


    useEffect(() => {
        (async function() {
            const { data } = await axios.get(
                `/api/products/${productId}`
            );
            setProduct(data)
        })();
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        const {  data, status} = await axios.patch(
            `/api/products/${product.id}`,
            { ...product },
            {
                validateStatus: () => true
            }
        );

        if(status === 200){
            setProduct(data)
            enqueueSnackbar("Save was succeed", {
                variant: 'success',
            });
            return;
        };

        if (status === 422) {
            Object.values(data.errors).forEach(i => {
                enqueueSnackbar(i[0], {
                    variant: 'error',
                });
            });
            return;
        };

        if(status === 422) {
            enqueueSnackbar("Occurred an internal error", {
                variant: 'error',
            });
            return
        };
    }


    return (
        product && (
        <div className="container">
            <header className={["py-4"]}>
                <h1>Product: {product.name} </h1>
            </header>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item >
                            <Box p={3} component={Paper}  >
                                <InputLabel>Images</InputLabel>
                                {product.image.map(image => {
                                    return (
                                        <Box p={0.5} display="inline-box">
                                            <img width={100} src={image.link}   />
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Grid>
                        <Grid item >
                            <Box p={3} component={Paper}  >
                                <InputLabel>Resume</InputLabel>
                                <Typography>{product.resume}</Typography>
                            </Box>
                        </Grid>
                        <Grid item >
                            <Box p={3} component={Paper}  >
                                <InputLabel>Description</InputLabel>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={product.description}
                                    onChange={(event, editor) => {
                                        console.log(editor.getData())
                                        setProduct({...product, description: editor.getData()})
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <div className="col-md-4 bg-white py-3">
                    <Grid container direction="column" spacing={4}>

                        <Grid item md={10}>
                            <InputLabel>Reference</InputLabel>
                            <TextField
                                fullWidth
                                size={"small"}
                                id="outlined-basic"
                                variant="outlined"
                                value={product.ref}
                                onChange={(e) => {
                                    setProduct({...product, ref: e.target.value })
                                }}
                            />
                        </Grid>
                        <Grid item md={10}>
                            <InputLabel>Quantity</InputLabel>
                            <TextField
                                fullWidth
                                size={"small"}
                                id="outlined-basic"
                                variant="outlined"
                                value={product.quantity}
                                onChange={(e) => {
                                    setProduct({...product, quantity: e.target.value })
                                }}
                            />
                        </Grid>
                        <Grid item md={10}>
                            <InputLabel>Price</InputLabel>
                            <Grid container spacing={3}>
                                <Grid item md={6}>
                                    <Typography variant={"caption"}>
                                        HT
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size={"small"}
                                        value={product.price_ht}
                                        onChange={(e) => {
                                            setProduct({...product, price_ht: e.target.value })
                                        }}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant={"caption"}>
                                        TTC
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size={"small"}
                                        value={product.price_ttc}
                                        onChange={(e) => {
                                            setProduct({...product, price_ttc: e.target.value })
                                        }}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={10}>
                            <InputLabel>Category</InputLabel>
                            <Grid container direction={"column"} spacing={2} >
                                <Grid item>
                                    <Paper elevation={0}>
                                        <Box p={1}>
                                            {product.category.map(category => {
                                                return (
                                                    <Box p={0.5}   display={"inline-box"}>
                                                        <Chip label={category.name} size={"medium"} />
                                                    </Box>
                                                )
                                            })}
                                        </Box >
                                    </Paper>
                                </Grid>

                                <Grid item>
                                    <List className={classes.root}>
                                        {allCategories.map((category) => {
                                            const labelId = `checkbox-list-label-${category.name}`;

                                            return (
                                                <ListItem key={category.name} role={undefined} dense button onClick={handleToggle(category)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            tabIndex={-1}
                                                            checked={checkedCategory(category)}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={`${category.name}`} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item md={10}>

                            <InputLabel>Active ?</InputLabel>
                            <Switch
                                label={"Active"}
                                checked={product.is_active}
                                onChange={
                                    (event) => setProduct({...product, is_active: event.target.checked})
                                }
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Grid>
                        <Grid item md={10}>
                            <Button onClick={handleSubmit} color={"primary"} fullWidth variant={"contained"}>Save</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
        )
    );
}

export default ProductDetails;

if (document.getElementById("product-details")) {

    const element = document.getElementById('product-details')
    const props = Object.assign({}, element.dataset)

    ReactDOM.render(
            <Snackbar>
                <ProductDetails {...props} />
            </Snackbar>,
    document.getElementById("product-details")
    );
}
