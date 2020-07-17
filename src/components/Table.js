import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles(() => ({
    root: { maxHeight: 500 }
}));

const DynamicTable = (props) => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        let _rows = [];
        let _headers = [];

        for (const [, value] of Object.entries(props.tableData)) _rows.push(value);
        setRows(_rows);

        _rows.map((item) => {
            Object.keys(item).map((key) => {
                return _headers.push(key);
            });
            return "Done";
        });

        setHeaders(_headers.filter((value, index) => _headers.indexOf(value) === index));
    }, [props.tableData]);

    if (rows.length > 0) {
        return (
            <>
                <h2>{props.tableName}</h2>
                <TableContainer component={Paper} className={classes.root}>
                    <Table className={classes.table} aria-label="dynamic-table">
                        <TableHead>
                            <TableRow>
                                {headers.map((item, index) => {
                                    return (
                                        <TableCell key={index}>{item}</TableCell>
                                    )
                                })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {
                                                Object.entries(item).map(([key, value]) => {
                                                    return (
                                                        <TableCell key={key} >{value}</TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    } else {
        return null;
    }
}

export default DynamicTable;