import React, { useReducer, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        padding: '1em'
    }
}));

const availableContractsService = {
    initialState: {
        entity: "",
        smid: ""
    },
    func: () => {},
    fields: [
        {
            label: "Entity",
            name: "entity",
            value: "",
            required: true,
            type: "text"
        },
        {
            label: "SMID",
            name: "smid",
            value: "",
            required: true,
            type: "password"
        }
    ]
};

let initialState = {};

const reducer = (state, action) => {
    if (action.type === "reset") {
        return initialState;
    }

    const result = { ...state };
    result[action.type] = action.value;
    return result;
};

const DynamicForm = (props) => {
    const classes = useStyles();
    const [resMsg, setResMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loader, showLoader] = useState(false);
    const [titleName, setTitleName] = useState([]);

    useEffect(() => {
        let titleArr = props.name.split("_");
        let temp = [];
        for (var i = 0; i < titleArr.length; i++) {
            temp.push(titleArr[i].charAt(0).toUpperCase() + titleArr[i].slice(1) + " ");
        }
        setTitleName(temp)
    }, [props.name]);

    let fields = [];
    let func;

    if (props.name === "available_contracts_service") {
        fields = availableContractsService.fields;
        initialState = availableContractsService.initialState;
        func = availableContractsService.func;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const sendFormResults = (data) => {
        props.receiveFormResults(data);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setErrMsg("");
        setResMsg("");
        showLoader(true);

        let isValid = true;
        fields.map((item) => {
            if (item.required) {
                if (!state[item.name]) isValid = false;
            }
            return "done";
        });

        if (!isValid) {
            setErrMsg("Fields with * are required.");
            showLoader(false);
            return;
        }

        try {
            let res = await func(state);
            if (res.data) {
                if (res.data.Message) setResMsg(res.data.Message);
                if (res.data.Error) setErrMsg(res.data.Error);
                sendFormResults(res.data);
                showLoader(false);
            }

        } catch (error) {
            showLoader(false);
            setErrMsg(error.toString());
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        dispatch({ type: name, value });
    };

    return (
        <Paper className={classes.root}>

            <form>
                <Grid container spacing={2}>

                    <Grid item lg={12}>
                        <Typography variant="inherit" component="h3">
                            {titleName}
                        </Typography>
                    </Grid>

                    {fields.map((item, index) => {
                        return (
                            <Grid item lg={3} key={index}>
                                {item.required ?
                                    <TextField onChange={handleChange} type={item.type} label={item.label} name={item.name} value={state[index]} variant="outlined" size="small" required />
                                    :
                                    <TextField onChange={handleChange} type={item.type} label={item.label} name={item.name} value={state[index]} variant="outlined" size="small" />
                                }
                            </Grid>
                        )
                    })}

                    <Grid item lg={12}>
                        {
                            loader ?
                                <Button variant="contained" onClick={handleSubmit} color="primary" startIcon={<CircularProgress style={{ color: '#FAFAFA' }} size={24} />}>Submit</Button>
                                :
                                <Button variant="contained" onClick={handleSubmit} color="primary">Submit</Button>
                        }
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default DynamicForm;