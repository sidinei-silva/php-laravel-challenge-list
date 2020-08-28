import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSnackbar } from 'notistack';
import Snackbar from "../Snackbar";
import {Avatar , Chip, Box, Link, IconButton} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { green, red } from '@material-ui/core/colors';
import CustomSearchRender from './CustomSearchRender';

import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiTablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";

function Index() {
    const { enqueueSnackbar } = useSnackbar();

    const [count, setCount] = React.useState(0);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [products, setProducts] = React.useState([]);

    const [termSearch, setTermSearch] = React.useState('');

    const theme = createMuiTheme({
        palette: {
            primary:{
                main : "#3490dc"
            }
        },

        overrides: {

            MUIDataTableHeadCell: {
                root: {
                    backgroundColor: '#000',
                    textAlign: "center",

                },
                fixedHeader: {
                    backgroundColor: '#3490dc',
                    color: '#fff',
                }
            },

            MUIDataTableBodyCell: {
                root: {
                    textAlign: "center"
                }
            },

        }
    })


    const getProducts = async (meta) => {
        const {rows = 10, page = 1, search = termSearch} = meta

        await axios.get(
            `/api/products?page=${page}&limit=${rows}
            ${search ? `&search=${search}`: '' }`
        )
            .then((response) => {
                    const products = response.data.data;
                    setProducts(products);
                    setCount(response.data.meta.total);
                }).catch((error) => {
                enqueueSnackbar(error.message, {
                    variant: 'warning',
                });
            });
    }

    const onChangePage = (currentPage) => {
        setPageIndex(currentPage);
        getProducts({ page: currentPage + 1, rows: rowsPerPage });
    };

    const onChangeRowsPerPage = (numberOfRows) => {
        let currentPage = pageIndex;
        if (numberOfRows > count && currentPage !== 0) {
            currentPage = 0;
            setPageIndex(currentPage);
        }
        setRowsPerPage(numberOfRows);
        getProducts({ page: currentPage + 1, rows: numberOfRows });
    };

    const sendSearch = (termSearch) => {
        setTermSearch(termSearch)
        setPageIndex(0);
        getProducts({ search: termSearch });
    }

    useEffect(() => {
        getProducts({ page: pageIndex + 1, rows: rowsPerPage });
    }, [products]);

    const options = {
        serverSide: true,
        enableNestedDataAccess: '.',
        download: false,
        fixedSelectColumn: false,
        searchOpen: true,
        print: false,
        viewColumns: false,
        filter: false,
        selectableRows: 'none',
        confirmSearch: true,
        count,
        page: pageIndex,
        rowsPerPage,
        rowsPerPageOptions: [10, 30, 100],
        onTableInit: () => {
            getProducts({ page: pageIndex + 1, rows: rowsPerPage });
        },
        onChangePage,
        onChangeRowsPerPage,
        customSearchRender: (searchText, handleSearch, hideSearch, options) => {
            return (
                <CustomSearchRender
                    searchText={searchText}
                    onSearch={handleSearch}
                    onHide={hideSearch}
                    sendSearch={sendSearch}
                    options={options}
                />
            );
        },
        customFooter: (textLabels) => {
            return (
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            <MuiTablePagination
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={pageIndex}
                                labelRowsPerPage={textLabels.rowsPerPage}
                                backIconButtonProps={{
                                    'aria-label': textLabels.previous,
                                }}
                                nextIconButtonProps={{
                                    'aria-label': textLabels.next,
                                }}
                                rowsPerPageOptions={[10,20,100]}
                                onChangePage={(_, page) => onChangePage(page)}
                                onChangeRowsPerPage={(event) => onChangeRowsPerPage(event.target.value)}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            );
        },

    };

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                sort: false,
            }
        },
        {
            name: "image",
            label: "Image",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const image_default = value.filter((image) => image.is_default === true);
                    return (
                        <Avatar  variant="rounded" src={image_default[0].link} />
                    );
                }
            },
        },
        {
            name: "ref",
            label: "Réf.",
            options: {

                sort: false,
            }
        },
        {
            name: "name",
            label: "Name",
            options: {

                sort: false,
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Box width={10}>
                            {value.map(category => {
                                return (
                                    <Box py={0.5}>
                                        <Chip label={category.name} size={"small"} />
                                    </Box>
                                )
                            })}
                        </Box >
                    );
                }
            },
        },
        {
            name: "price_ht",
            label: "Price HT",
            options: {

                sort: false,
            }
        },
        {
            name: "quantity",
            label: "Quantity",
            options: {

                sort: false,
            }
        },
        {
            name: "is_active",
            label: "Category",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        value ?
                            <FiberManualRecordIcon style={{color: green[500]}} fontSize={"small"} /> :
                            <FiberManualRecordIcon style={{color: red[500]}} fontSize={"small"} />
                    );
                }
            },
        },
        {
            name: '',
            label: '',
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const product = products[tableMeta.rowIndex];
                    return (

                        <Link href={`/product/${product.id}`}
                            className="no-decoration"
                        >
                            <IconButton color={"primary"} >
                                <MoreVertIcon  />
                            </IconButton>

                        </Link>

                    );
                },
            },
        },
    ];


    return (
        <MuiThemeProvider theme={theme}>
            <MUIDataTable
                data={products}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    );
}

export default Index;

if (document.getElementById('products-table')) {
    ReactDOM.render(
        <Snackbar>
            <Index />
        </Snackbar>, document.getElementById('products-table'));
}
