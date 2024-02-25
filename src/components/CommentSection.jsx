import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {DataContext,TriggerContext} from '../utils/context';
import features from '../utils/features';
import Comment from './Comment';

const CommentSection = () => {
    const {comments,setComments} = useContext(DataContext);
    const [data,setData] = useState(features.reconstruct(comments));
    const [trigger,setTrigger] = useState(false);

    useEffect(()=>{
        setData(features.reconstruct(comments));
        console.log(data);
    },[comments,setComments,trigger,setTrigger])

    return (
        <TriggerContext.Provider value={{trigger,setTrigger}}>
            <div className='rounded-xl bg-neutral-700 h-96 w-full p-4 flex flex-col justify-start items-end gap-3 overflow-scroll'>
                {[...data.entries()]?.map(([lvl1,c1])=>{
                    return <div className='w-full flex flex-col items-end gap-1' key={Math.random()}>
                        <Comment key={lvl1.id} data={lvl1}/>
                        {[...c1.entries()]?.map(([lvl2,c2])=>{
                            return <div className='w-full flex flex-col items-end gap-1' key={Math.random()}>
                                <Comment key={lvl2.id} data={lvl2}/>
                                {[...c2]?.map((lvl3)=>{
                                    return <Comment key={lvl3.id} data={lvl3}/>
                                })}
                            </div>
                        })}
                    </div>
                })}
            </div>
        </TriggerContext.Provider>
    )
}

export default CommentSection;