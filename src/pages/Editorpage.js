import React, {useState, useRef, useEffect} from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';


const Editorpage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();

  useEffect(() => {
       const init = async () => {
       socketRef.current= await initSocket();
       socketRef.current.on('connect_error', (err) => handleErrors(err));
       socketRef.current.on('connect_failed', (err) => handleErrors(err));
        
       function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
       }

       socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username, 
    });
       };
       init();
  }, []);


    const [clients, setClients] = useState([
        {socketId: 1, username: 'reni'},
        {socketId: 2, username: 'Vaibhav'},
    ]);
     
    if (!location.state){
      return <Navigate to= "/" />
    }


    return <div className='mainWrap'>
        <div className='aside'>
            <div className='asideInner'>
                <div className='logo'>
                    <img className='logoImage' src='/logo512.png' alt='logo' />
                </div>
                <h3> Connected </h3>
                <div className='clientsList'> 
                  {
                    clients.map((client)=>
                        ( <Client key={client.socketId} username={client.username}/>) 
                 )}
                 </div>
            </div>
          <button className='btn copyBtn'> Copy Room Id</button>
          <button className='btn leaveBtn'>Leave</button>
        </div>
        <div className='editorWrap'> 
          <Editor />
         </div>
    </div>;

};

export default Editorpage;