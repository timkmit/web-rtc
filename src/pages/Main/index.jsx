import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import ACTIONS from "../../socket/actions.js";

import { v4 } from 'uuid';

function Main() {
    const navigate = useNavigate();
    const [rooms, updateRooms] = useState([]);

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
            updateRooms(rooms);
        });
    }, []);

    return (
        <div>
            <h1>Rooms</h1>
            <ul>
                {rooms.map(roomID => (
                    <li key={roomID}>
                        {roomID}
                        <button onClick={() => {
                            navigate(`/room/${roomID}`);
                        }}>JOIN ROOM</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => {
                navigate(`/room/${v4()}`);
            }}>Create new room</button>
        </div>
    );
}

export default Main;
