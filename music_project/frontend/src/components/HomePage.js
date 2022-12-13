import React, {Component} from 'react'
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {Grid, Button, ButtonGroup, Typography} from '@mui/material'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Redirect,
    Navigate,
  } from "react-router-dom";
  import Room from "./Room";

  // Class Based Component
  export default class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        roomCode: null,
      }
    }

    async componentDidMount(){
      fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
    }

    renderHomePage() {
      if(this.state.roomCode){
        return (
          <Navigate to={`/room/${this.state.roomCode}`}/>
        );
      }else{
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography variant="h3">
                Music Lounge
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="primary" to="/join" component={Link}>
                  Join a Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create a Room
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
  
        );

      }
      
    }
  
    render() {
      return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={this.renderHomePage()}/>
            <Route path="/join" element={<RoomJoinPage/>} />
            <Route path="/create" element={<CreateRoomPage/>} />
            <Route path="/room/:roomCode" element={<Room/>} />
          </Routes>
        </BrowserRouter>
      );
    }
  }