import { useParams } from "react-router-dom";
import useWebRTC from "../../hooks/useWebRTC";

function Room() {
    const {id: roomID} = useParams()

    useWebRTC(roomID)

    console.log(roomID)
    return ( 
        <div>
            Room page
        </div>
     );
}

export default Room;