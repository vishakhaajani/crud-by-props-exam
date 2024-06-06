import React from 'react'

const View = ({ record,deleteUser,editUser,multitpleDelete,allDelete,multitpleStatus,allStatus,mstatus }) => {
    return (
        <>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Sr no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">status</th>
                        <th scope="col">Action</th>
                        <th scope="col">
                            <button className='btn btn-sm btn-danger' onClick={() => allDelete()}>Delete</button>
                        </th>
                        <th>
                            <button className='btn btn-sm btn-success' onClick={() => allStatus()}>status</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        record.map((val)=>{
                            return(
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.phone}</td>
                                    <td>{val.status}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm me-2' onClick={() => deleteUser(val.id)}>Delete</button>
                                        
                                        <button className='btn btn-sm btn-success ms-2' onClick={()=> editUser(val)}>Edit</button>
                                    </td>
                                    <td>
                                        <input type="checkbox" onClick={(e) => multitpleDelete(val.id,e.target.checked)} />
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={mstatus.includes(val.id)} onClick={(e) => multitpleStatus(val.id,e.target.checked)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default View
