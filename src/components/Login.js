import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Container, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    });
    const [responseMsg, setResponseMsg] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setFormdata({ ...formdata, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}users/login`, formdata);
            const { token } = res.data; // Get the token from the response
            localStorage.setItem('authToken', token); // Store the token in local storage
            setResponseMsg("Logged in successful");
            navigate('/dashboard'); // Redirect to the Dashboard
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
                Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ margin: "20px" }} >
                <Grid container spacing={2}>
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
                            color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )

}

export default Login;