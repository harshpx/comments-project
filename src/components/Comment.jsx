import React, { useState } from 'react';
import { useContext } from 'react';
import { IoSend } from "react-icons/io5";
import {DataContext,TriggerContext} from '../utils/context';
import features from '../utils/features';
import { FaRegStar,FaStar } from "react-icons/fa";


const Comment = ({data}) => {
    const {comments,setComments} = useContext(DataContext);
    const {trigger,setTrigger} = useContext(TriggerContext);

    const [toReply,setToReply] = useState(false);
    const [replyText,setReplyText] = useState('');

    const deleteComment = ()=>{
        const updatedComments = features.deleteComment(data,comments);
        setComments(updatedComments);
        localStorage.setItem('comments',JSON.stringify(updatedComments));
    }

    const reply = ()=>{
        const newComment = {
            id:Date.now(),
            text:replyText,
            level:data.level + 1,
            parentId:data.id,
            children:[],
            star:false,
        }
        const updatedComments = features.addReply(newComment,comments);
        setComments(updatedComments);
        setReplyText('');
        setToReply(false);
    }

    const linkUnlike = ()=>{
        const updatedComments = features.toggleStar(data,comments);
        setComments(updatedComments);
        setTrigger(prev=>!prev);
    }

    const dateFormat = (info)=>{
        const date = new Date(info);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${day}/${month} ${hours}:${minutes}`;
        return formattedDate;
    }



    return (
        <div className={`flex flex-col justify-center items-start  ${data.level==1 ? 'w-9/12' : (data.level==2 ? 'w-7/12' : 'w-5/12')}`}>
    
            <div className='flex justify-between items-center w-full bg-neutral-900 rounded-2xl px-3 py-1'>
                <div className='text-xl leading-10'>{data.text}</div>
                <div className='cursor-pointer hover:scale-125 duration-150' onClick={linkUnlike}>
                    {data.star ? <FaStar className='text-cyan-400'/> : <FaRegStar/>}
                </div>
            </div>
    
            <div className='flex items-center gap-2 px-3 justify-between w-full'>
                <div className='flex items-center gap-3'>
                    <button onClick={()=>setToReply(prev=>!prev)} className={`text-sm ${data.level==3 ? "hidden" : ""}`}>Reply</button>
                    <button onClick={deleteComment} className='text-sm'>Delete</button>
                </div>
                <div className='text-xs text-right'>
                    {dateFormat(data.id)}
                </div>
            </div>

            <div className={`flex justify-between items-center w-full bg-neutral-800 rounded-2xl  px-3 py-1 ${!toReply ? "hidden" : ""} mb-2`}>

                <textarea type="text" name="text" id="text" value={replyText} onChange={(e)=>setReplyText(String(e.target.value))} rows={1} className='w-full bg-neutral-800 focus:outline-none leading-10' placeholder='Write reply...'/>
                <button onClick={reply} className='hover:text-cyan-400'>
                    <IoSend size={20}/>
                </button>

            </div>
        </div>
    )
}

export default Comment;