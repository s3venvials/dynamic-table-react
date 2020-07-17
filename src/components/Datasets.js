import React from 'react';
import Faker from 'faker';
import { Paper, Button, Grid } from '@material-ui/core';

const Datasets = (props) => {

    const sendDataResults = (data, name) => {
        props.receiveDataResults(data, name);
    }

    let temp = [];
    let count = Math.floor(Math.random() * 50) + 1;

    const employee = () => {
        for (var i = 0; i < count; i++) {
            temp.push({
                FirstName: Faker.name.firstName(),
                LastName: Faker.name.lastName(),
                Title: Faker.name.title(),
                JobArea: Faker.name.jobArea()
            });
        }
        return temp;
    }

    const company = () => {
        for (var i = 0; i < count; i++) {
            temp.push({
                Name: Faker.company.companyName(),
                Suffix: Faker.company.companySuffix(),
                State: Faker.address.state(),
                Address: Faker.address.streetAddress()
            });
        }
        return temp;
    }

    const customer = () => {
        for (var i = 0; i < count; i++) {
            temp.push({
                Name: Faker.company.companyName(),
                Email: Faker.internet.email(),
                Username: Faker.internet.userName(),
                State: Faker.address.state(),
                Address: Faker.address.streetAddress()
            });
        }
        return temp;
    }

    const handleSubmit = (event, name) => {
        event.preventDefault();
        let data;
        if (name === "Employee Data Set") data = employee();
        if (name === "Company Data Set") data = company();
        if (name === "Customer Data Set") data = customer();
        sendDataResults({data, name});
    }

    return (
        <Paper style={{ padding: '2em' }}>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                    <Button onClick={(e) => handleSubmit(e, "Employee Data Set")} variant="contained" color="primary">Employees Data Set</Button>
                </Grid>
                <Grid item lg={4}>
                    <Button onClick={(e) => handleSubmit(e, "Company Data Set")} variant="contained" color="secondary">Companies Data Set</Button>
                </Grid>
                <Grid item lg={4}>
                    <Button onClick={(e) => handleSubmit(e, "Customer Data Set")} variant="contained" color="default">Customer Data Set</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Datasets;
