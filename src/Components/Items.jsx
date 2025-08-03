import React from 'react'

const Items = ({ data, id, deleteTodo,startEdit}) => {
    return (
        <>
            <div className="delete-container" onDoubleClick={() => startEdit(id, data)}>
                <li>{data}</li>
                <button className='dl-btn' onClick={() => deleteTodo(id)}>Delete</button>
                <button onClick={() => startEdit(id, data)} style={{ backgroundColor:'#ea9310'}}>Edit</button>

            </div>       
             </>
    )
}
export default Items;
