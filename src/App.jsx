import React, { useEffect, useRef, useState } from 'react'

import CommentSection from './components/CommentSection';
import {DataContext} from './utils/context.js';

import { IoSend } from "react-icons/io5";
import logowhite from './assets/logowhite.png';
import logoblack from './assets/logoblack.png';
import cyanUser from './assets/cyanuser.png';

const App = () => {

    // saves username
    const [user,setUser] = useState("");

    // variable that stores all comments
    const [comments,setComments] = useState([]);

    // to check localStorage for previously entered user (on page load)
    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        const savedComments = JSON.parse(localStorage.getItem('comments'));
        if(savedComments) setComments(savedComments);
        if(savedUser) setUser(savedUser);
    },[])

    // enter keypress event listener on login page
    // useEffect(()=>{
    //     const enterKeyPress = (e)=>{
    //         if(e.code=='Enter') getIn();
    //     }
    //     if(!user){
    //         window.addEventListener('keypress',enterKeyPress);
    //     }
    //     return ()=>{
    //         window.removeEventListener('keypress',enterKeyPress);
    //     }
    // })


    // username from field variable
    const [authUsername,setAuthUsername] = useState('');
    // const [authPassword,setAuthPassword] = useState('');

    


    // function to set username and signin a user
    const getIn = ()=>{
        setUser(authUsername);
        localStorage.setItem('user',authUsername);
    }

    // function to logout a user and clear localstorage
    const leave = ()=>{
        setUser("");
        setComments([]);
        localStorage.clear();
    }

    // text variable while posting or replying to a comment
    const [text,setText] = useState('');

    // function to post a new comment and update localstorage accordingly
    const postComment = ()=>{
        const comment = {
            id: Date.now(),
            text,
            children:[],
            star:false,
            parentId:0,
            level:1,
        }

        setComments(prev=>[comment,...prev]);
        localStorage.setItem('comments',JSON.stringify([comment,...comments]));
        setText('');
    }

    // to test
    useEffect(()=>{
        console.log(comments);
    },[comments])


    return (
        <div className={`min-h-screen min-w-full bg-neutral-800 text-white flex flex-col items-center relative ${!user ? "justify-center" : ""}`}>

            {/* presistant navbar */}
            <nav className={`top-0 w-full py-2 px-4 bg-neutral-900 flex items-center ${!user ? "justify-between absolute top-0" : "justify-between absolute top-0"}`}>
                {!user ? <>
                    <img src={logowhite} alt="" className='w-36'/>
                    <h1>Welcome to <span className='text-cyan-500'>Comments!</span></h1>
                </> : <>
                    <img src={logowhite} alt="" className='w-36'/>
                    <div className='flex items-center gap-1'>
                        <h1>Hi <span className='text-cyan-400'>{user}</span></h1>
                        <img src={cyanUser} alt="" className='w-8'/>
                        <button onClick={leave} className='text-sm rounded-lg bg-cyan-500 px-2 py-1'>Leave</button>
                    </div>
                </>}
            </nav>

            {!user ? <>
                {/* code when not signed in */}
                <div className='rounded-2xl bg-neutral-600 w-80 flex flex-col items-center justify-evenly p-6 gap-6'>
                    <div className=''>
                        <h1 className='text-xl text-center inline'>Enter in <img src={logowhite} alt="" className='w-40'/></h1>
                    </div>
                    <div className='w-full rounded-xl flex flex-col gap-1 items-center'>

                        <input type="text" name="username" id="username" value={authUsername} onChange={(e)=>setAuthUsername(String(e.target.value))} placeholder='Username' className='w-11/12 py-1 px-2 leading-8 rounded-lg text-black  focus:outline-none'/>

                        {/* <input type="password" name="password" id="password" value={authPassword} onChange={(e)=>setAuthPassword(String(e.target.value))} placeholder='Password' className='w-11/12 py-1 px-2 leading-8 rounded-lg text-black focus:outline-none '/> */}

                    </div>
                    <div className='w-1/4'>
                        <button onClick={getIn} className='w-full bg-cyan-500 rounded-lg px-3 py-1 hover:bg-cyan-600 hover:scale-105 duration-150'>Enter!</button>
                    </div>
                </div>
            </> : <>
                {/* code when signed in */}
                <div className='mt-20 min-w-full flex flex-col items-center p-5 gap-5'>

                    {/* input box */}
                    <div className='flex justify-center gap-2 rounded-lg w-11/12 sm:w-7/12 md:w-1/2 lg:w-1/3 xl:w-1/3'>

                        <img src={cyanUser} alt="" className='w-10 h-10 p-1 rounded-full bg-neutral-600'/>

                        <div className='flex flex-col bg-neutral-700 rounded-2xl p-2 items-end w-full'>

                            <textarea type="text" rows='4' value={text} onChange={(e)=>setText(String(e.target.value))} className='w-full rounded-2xl px-5 py-2 focus:outline-none bg-neutral-700' placeholder='Write your mind here...'/>

                            <button onClick={postComment} className='flex gap-2 items-center text-base rounded-lg bg-cyan-500 px-2 py-1'>Post<IoSend/></button>

                        </div>

                    </div>

                    {/* comment section */}
                    <div className='w-full sm:w-8/12 md:w-1/2 lg:w-1/3 flex flex-col'>
                        <DataContext.Provider value={{comments,setComments}}>
                            <CommentSection/>
                        </DataContext.Provider>
                    </div>

                </div>
            </>}

        </div>
    )
}

export default App;