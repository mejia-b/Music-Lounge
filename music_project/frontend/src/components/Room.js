import React, { useState } from "react";
import { useParams, useNavigate} from "react-router-dom";  
import {Grid, Button , Typography} from '@mui/material'

function Room(props) {
    const navigate = useNavigate();
    const[votesToSkip, setVotesToSkip] = useState(2);
    const[guestCanPause, setGuestCanPause] = useState(false);
    const[isHost, setIsHost] = useState(false);
    
    const { roomCode } = useParams();

    React.useEffect(() => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then(response => {
                if (!response.ok) {
                    props.leaveRoomCallback(); 
                    navigate("/");
                } else {
                    return response.json();
                }
            })
            .then(data => {
               setVotesToSkip(data.votes_to_skip)
               setGuestCanPause(data.guest_pause)
               setIsHost(data.host)
            });
    }, []);

    const leaveButtonPressed = () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            };
            fetch(`/api/leave-room`, requestOptions)
                .then(_response => {
                    props.leaveRoomCallback();
                    navigate("/");
                });
        }
       

    return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {String(guestCanPause)}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {String(isHost)}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                Leave Room
            </Button>
            </Grid>
        </Grid>
        
        )

    


}

export default Room;