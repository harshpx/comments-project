// features for manipulating comment threads
// to add reply to a comment

const addReply = (newComment, comments) => {
    const pId = newComment.parentId;
    const id = newComment.id;

    comments = [newComment,...comments];

    for(let lvl1 of comments){
        if(lvl1.id==pId) {
            lvl1.children = [id,...lvl1.children];
            localStorage.setItem('comments',JSON.stringify(comments));
            return comments;
        }
        for(let lvl2 of lvl1.children){
            if(lvl2.id==pId){
                lvl2.children = [id,...lvl2.children];
                localStorage.setItem('comments',JSON.stringify(comments));
                return comments;
            }
        }
    }
    localStorage.setItem('comments',JSON.stringify(comments));
    return comments;
}

// to delete a comment
const deleteComment = (comment,comments) => {

    const id = comment.id;
    const pId = comment.parentId;
    const c1 = comment.children;

    // cleanup children
    for(let lvl2 of comments){
        if(c1.includes(lvl2.id)){
            const c2 = lvl2.children;
            for(let lvl3 of comments){
                if(c2.includes(lvl3.id)){
                    comments = comments.filter(data=>data.id!=lvl3.id);
                }
            }
            comments = comments.filter(data=>data.id!=lvl2.id);
        }
    }

    comments = comments.filter(comment=>comment.id!=id);

    // update parent
    for(let lvl1 of comments){
        if(lvl1.id==pId){
            lvl1.children = lvl1.children.filter(data => data.id!=id);
            localStorage.setItem('comments',JSON.stringify(comments));
            return comments;
        }
        for(let lvl2 of lvl1.children){
            if(lvl2.id==pId){
                lvl2.children = lvl2.children.filter(data => data.id!=id);
                localStorage.setItem('comments',JSON.stringify(comments));
                return comments;
            }
        }
    }
    localStorage.setItem('comments',JSON.stringify(comments));
    return comments;
}

const toggleStar = (comment,comments)=>{
    const id = comment.id;
    const star = comment.star;
    for(let cmnt of comments){
        if(cmnt.id==id){
            cmnt.star = !star;  
        }
    }
    console.log(comments);
    localStorage.setItem('comments',JSON.stringify(comments));
    return comments;
}

const reconstruct = (comments)=>{
    const data = new Map();
    
    for(let lvl1 of comments){
        if(lvl1.parentId==0){
            const c1 = lvl1.children;
            data.set(lvl1,new Map());
            for(let lvl2 of comments){
                if(c1.includes(lvl2.id)){
                    const c2 = lvl2.children;
                    data.get(lvl1).set(lvl2,new Set());
                    for(let lvl3 of comments){
                        if(c2.includes(lvl3.id)){
                            data.get(lvl1).get(lvl2).add(lvl3);
                        }
                    }
                }
            }
        }
    }
    return data;
}

const sortByDateDesc = (comments)=>{
    const data = new Map();
    
    const arr1 = comments.filter(cmnt=>cmnt.parentId==0)
    arr1.sort((a,b)=>b.id-a.id);
    
    for(let lvl1 of arr1){
        const c1 = lvl1.children;
        data.set(lvl1,new Map());

        const arr2 = comments.filter(cmnt=>c1.includes(cmnt.id));
        arr2.sort((a,b)=>b.id-a.id);

        for(let lvl2 of arr2){
            const c2 = lvl2.children;
            data.get(lvl1).set(lvl2,new Set());

            const arr3 = comments.filter(cmnt=>c2.includes(cmnt.id));
            arr3.sort((a,b)=>b.id-a.id);

            for(let lvl3 of arr3){
                data.get(lvl1).get(lvl2).add(lvl3);
            }
        }
    }
    return data;
}

const sortByDateAsc = (comments)=>{
    const data = new Map();

    const arr1 = comments.filter(cmnt=>cmnt.parentId==0)
    arr1.sort((a,b)=>a.id-b.id);
    
    for(let lvl1 of arr1){
        const c1 = lvl1.children;
        data.set(lvl1,new Map());

        const arr2 = comments.filter(cmnt=>c1.includes(cmnt.id));
        arr2.sort((a,b)=>a.id-b.id);

        for(let lvl2 of arr2){
            const c2 = lvl2.children;
            data.get(lvl1).set(lvl2,new Set());

            const arr3 = comments.filter(cmnt=>c2.includes(cmnt.id));
            arr3.sort((a,b)=>a.id-b.id);

            for(let lvl3 of arr3){
                data.get(lvl1).get(lvl2).add(lvl3);
            }
        } 
    }
    return data;
}

const sortByReplyCountDesc = (comments)=>{
    const data = new Map();

    const arr1 = comments.filter(cmnt=>cmnt.parentId==0)
    arr1.sort((a,b)=>b.children.length-a.children.length);
    
    for(let lvl1 of arr1){
        const c1 = lvl1.children;
        data.set(lvl1,new Map());

        const arr2 = comments.filter(cmnt=>c1.includes(cmnt.id));
        arr2.sort((a,b)=>b.children.length-a.children.length);

        for(let lvl2 of arr2){
            const c2 = lvl2.children;
            data.get(lvl1).set(lvl2,new Set());

            const arr3 = comments.filter(cmnt=>c2.includes(cmnt.id));
            arr3.sort((a,b)=>b.children.length-a.children.length);

            for(let lvl3 of arr3){
                data.get(lvl1).get(lvl2).add(lvl3);
            }
        }
    }
    return data;
}

const sortByReplyCountAsc = (comments)=>{
    const data = new Map();

    const arr1 = comments.filter(cmnt=>cmnt.parentId==0)
    arr1.sort((a,b)=>a.children.length-b.children.length);
    
    for(let lvl1 of arr1){
        const c1 = lvl1.children;
        data.set(lvl1,new Map());

        const arr2 = comments.filter(cmnt=>c1.includes(cmnt.id));
        arr2.sort((a,b)=>a.children.length-b.children.length);

        for(let lvl2 of arr2){
            const c2 = lvl2.children;
            data.get(lvl1).set(lvl2,new Set());

            const arr3 = comments.filter(cmnt=>c2.includes(cmnt.id));
            arr3.sort((a,b)=>a.children.length-b.children.length);

            for(let lvl3 of arr3){
                data.get(lvl1).get(lvl2).add(lvl3);
            }
        }
    }
    return data;
}

const features = {
    addReply,
    deleteComment,
    toggleStar,
    reconstruct,
    sortByDateAsc,
    sortByDateDesc,
    sortByReplyCountAsc,
    sortByReplyCountDesc
}

export default features;