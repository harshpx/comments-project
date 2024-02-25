import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {DataContext,TriggerContext} from '../utils/context';
import features from '../utils/features';
import Comment from './Comment';

import { HiOutlineChevronUp } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BsDash } from "react-icons/bs";

const CommentSection = () => {
    const {comments,setComments} = useContext(DataContext);
    const [data,setData] = useState(features.reconstruct(comments));
    const [trigger,setTrigger] = useState(false);

    const [dateSort,setDateSort] = useState('Desc');
    const [countSort,setCountSort] = useState('NA');

    const changeDateSort = ()=>{
        if(dateSort=='Desc') {
            setDateSort('Asc');
            setData(features.sortByDateAsc(comments));
        }
        if(dateSort=='Asc' || dateSort=='NA') {
            setDateSort('Desc');
            setData(features.sortByDateDesc(comments));
        }
        setCountSort('NA');
    }
    const changeCountSort = ()=>{
        if(countSort=='Desc') {
            setCountSort('Asc');
            setData(features.sortByReplyCountAsc(comments));
        }
        if(countSort=='Asc' || countSort=='NA') {
            setCountSort('Desc');
            setData(features.sortByReplyCountDesc(comments));
        }
        setDateSort('NA');
    }

    useEffect(()=>{
        setData(features.reconstruct(comments));
        console.log(data);
    },[comments,setComments,trigger,setTrigger])

    return (
        <TriggerContext.Provider value={{trigger,setTrigger}}>

            <div className={`flex flex-col gap-2 items-center ${comments.length==0 ? "hidden" : ""}`}>

                <div className={`${comments.length==0 ? "hidden" : ""}`}>
                    <div className='flex gap-3 items-center'>
                        <h1>Sort by:</h1>
                        <button onClick={changeDateSort} className='rounded-xl px-2 py-1 border-2 flex gap-1 items-center'>
                            <span className='mr-2'>Date</span>
                            {/* <span className='text-xs'>{dateSort}</span> */}
                            {dateSort=='Desc' ? <IoIosArrowDown/> : (dateSort=='Asc' ? <HiOutlineChevronUp/> : <BsDash/>)}
                        </button>
                        <button onClick={changeCountSort} className='rounded-xl px-2 py-1 border-2 flex gap-1 items-center'>
                            <span className='mr-2'>Reply Count</span>
                            {/* <span className='text-xs'>{countSort}</span> */}
                            {countSort=='Desc' ? <IoIosArrowDown/> : (countSort=='Asc' ? <HiOutlineChevronUp/> : <BsDash/>)}
                        </button>
                    </div>
                </div>

                <div className='rounded-xl bg-neutral-700 h-96 w-full p-4 flex flex-col justify-start items-end gap-3 overflow-scroll'>
                    {/* rendering a 3-lvl comments thread  */}
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
            </div>
        </TriggerContext.Provider>
    )
}

export default CommentSection;