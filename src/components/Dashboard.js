// components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}protected-endpoint`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Attach the token in the Authorization header
                    }
                });
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard
            </Typography>
            <div>
                {data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </div>
        </Container>
    );
};

export default Dashboard;
