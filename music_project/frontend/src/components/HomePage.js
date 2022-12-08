import React, {Component} from 'react'
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import Room from "./Room";
  export default class HomePage extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<p>Home Page</p>}></Route>
            <Route path="/join" element={<RoomJoinPage/>} />
            <Route path="/create" element={<CreateRoomPage/>} />
            <Route path="/room/:roomCode" element={<Room/>} />
          </Routes>
        </BrowserRouter>
      );
    }
  }