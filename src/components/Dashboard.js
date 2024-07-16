import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [editingRoom, setEditingRoom] = useState(null);
    const [editingRoomName, setEditingRoomName] = useState('');
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            try {
                // Fetch user role
                const userRes = await axios.get(`${process.env.REACT_APP_API_URL}user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserRole(userRes.data.role); // Assuming the role is returned as part of user data
                
                // Fetch protected data
                const res = await axios.get(`${process.env.REACT_APP_API_URL}protected-endpoint`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(res.data);
                
                // Fetch chat rooms
                const roomRes = await axios.get(`${process.env.REACT_APP_API_URL}chatroom`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRooms(roomRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleCreateRoom = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}chatroom/create`, { name: newRoomName }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNewRoomName('');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}chatroom`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRooms(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateRoom = async (roomId) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}chatroom/${roomId}`, { name: editingRoomName }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEditingRoom(null);
            setEditingRoomName('');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}chatroom`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRooms(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteRoom = async (roomId) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}chatroom/${roomId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const res = await axios.get(`${process.env.REACT_APP_API_URL}chatroom`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRooms(res.data);
        } catch (err) {
            console.error(err);
        }
    };

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
            <div style={{ marginTop: 20 }}>
                <Typography variant="h6">Chat Rooms</Typography>
                <Grid container spacing={2}>
                    {userRole === 1 && ( // Only show this section if user is admin
                        <>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="New Room Name"
                                    variant="outlined"
                                    fullWidth
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateRoom}
                                    style={{ marginTop: 10 }}
                                >
                                    Create Room
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editingRoom && (
                                    <div>
                                        <TextField
                                            label="Edit Room Name"
                                            variant="outlined"
                                            fullWidth
                                            value={editingRoomName}
                                            onChange={(e) => setEditingRoomName(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleUpdateRoom(editingRoom.id)}
                                            style={{ marginTop: 10 }}
                                        >
                                            Update Room
                                        </Button>
                                    </div>
                                )}
                            </Grid>
                        </>
                    )}
                </Grid>
                <List>
                    {rooms.map((room) => (
                        <ListItem key={room.id} button>
                            <ListItemText primary={room.name} />
                            {userRole === 1 && ( // Only show edit and delete buttons if user is admin
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => {
                                        setEditingRoom(room);
                                        setEditingRoomName(room.name);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRoom(room.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </div>
        </Container>
    );
};

export default Dashboard;
