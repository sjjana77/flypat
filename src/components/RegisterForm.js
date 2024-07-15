import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Container, MenuItem, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [formdata, setFormdata] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        role: 2
    });
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setFormdata({ ...formdata, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}users/create_user`, formdata);
            setResponseMsg('User Created Successfully');
            console.log(res);
        }
        catch (err) {
            console.log(err);
            setResponseMsg('Error submitting form');
        }

    }


    useEffect(() => {
        console.log(formdata);
    }, [formdata])


    return (
        <Container maxWidth="sm" >
            <Typography variant="h4" align="center" gutterBottom>
                Register Form
            </Typography>
            <form onSubmit={handleSubmit} style={{ margin: "20px" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="name"
                            label="Name"
                            value={formdata.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            name="mobile"
                            label="Mobile"
                            value={formdata.mobile}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Email Id"
                            value={formdata.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Role"
                            name="role"
                            value={formdata.role}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="1">Admin</MenuItem>
                            <MenuItem value="2">User</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            value={formdata.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {responseMsg && <Typography>{responseMsg}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            style={{marginRight: "12px"}}
                            color="primary">
                            Submit
                        </Button>
                        <Link
                            to="/login"
                            variant="contained"
                            color="primary">
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default RegisterForm;
