import React, {useState } from 'react'

const Comment = ({comment,setParentComments,parentComments}) => {
    const id = comment?.id
    const [commentValue,setCommentValue] = useState('')
    const [comments,setComments] = useState([])
    const [isReply,setIsReply]= useState(false)
    return(
        <div style={{marginLeft: '30px',marginTop: '20px'}}>
        <div>
            <span style={{marginRight: '5px'}}>{comment.message}</span>
            <button style={{marginRight: '15px'}} onClick={(e) => { 
                setParentComments(parentComments.filter(comment => comment.id != id))
                setComments([])
            }}>DELETE</button>

            <button onClick={(e) => setIsReply(true)}>REPLY</button> 
            <span style={{marginLeft: '6px'}}>{comment.createdAt}</span>       
        </div>
        <div>
            {
                isReply &&
                <>
                <input style={{marginRight: '10px',marginTop: '8px'}} type="text" placeholder="Add your comment reply here.." value={commentValue} onChange={(e)=> {
                    setCommentValue(e.target.value)
                }} />
               <button onClick={(e) =>{
                    setComments([...comments,{id: Math.random() , message: commentValue, createdAt: new Date().toLocaleString()}])
                    setCommentValue('')
                    setIsReply(false)
                    
                }}
                disabled={commentValue == ''}> Reply</button>
                </>
            }
            {
                comments.map(comment => <Comment comment={comment} key={comment.id} setParentComments={setComments} parentComments={comments}/>)
            }  
        </div>
        </div>
    )
}



const CommentWidget = () => {

    const [commentValue,setCommentValue] = useState('')
    const [comments,setComments] = useState([])
    return (
        <div style={{width: '1000px',margin: '0 auto'}}>
            <h1>Comment Widget</h1>
            <div>
            <input type="text" value={commentValue} placeholder="Add your comment here.." onChange={(e)=> {
                setCommentValue(e.target.value)
            }} />
            <button  disabled={commentValue == ''} style={{marginLeft: '15px'}} onClick={(e) =>{
                setComments([...comments,{id: Math.random() , message: commentValue, createdAt: new Date().toLocaleString()}])
                setCommentValue('')
            } }>ADD COMMENT</button>
            {
                comments.map(comment => <Comment comment={comment} key={comment.id} setParentComments={setComments} parentComments={comments}/>)
            }
            </div>
            
        </div>
    )

}

export default CommentWidget