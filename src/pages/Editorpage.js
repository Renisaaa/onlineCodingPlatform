import React, {useState} from 'react'

const Editorpage = () => {
    const [clients, setClients] = useState([
        {socketId: 1, username: 'reni'},
        {socketId: 2, username: 'Vaibhav'},
    ]);
    return <div className='mainWrap'>
        <div className='aside'>
            <div className='asideInner'>
                <div className='logo'>
                    <img className='logoImage' src='/logo292.png' alt='logo' />
                </div>
                <h3> Connected </h3>
                <div className='clientsList'> 
                  {
                    clients.map((client)=>
                        ( <client />)
                 )}
                 </div>
            </div>
          
        </div>
        <div className='editorWrap'> Editor goes here..</div>
    </div>;

};

export default Editorpage;