import React, { useEffect, useState } from 'react'
import View from './View'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './header.css'

function Add() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [record, setRecord] = useState([])
    const [edit, setEdit] = useState("")
    const [mdelet, setmdelet] = useState([])
    const [mstatus, setmStatus] = useState([])

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('user')) || []
        setRecord(data)
    }, [])
    const handle = (e) => {
        e.preventDefault()

        if (!name || !phone) {
            toast.error("all fill reuired...");
            return false;
        }

        let obj = {
            id: Math.floor(Math.random() * 1000),
            name,
            phone,
            status: "deactive"
        }

        if (edit.id) {
            update(edit.id, obj)
        } else {
            let newrecord = [...record, obj];
            localStorage.setItem('user', JSON.stringify(newrecord));
            setRecord(newrecord);
            toast("user Add succesfully...");
        }

        setName("")
        setPhone("")
    }
    const deleteUser = (id) => {
        let d = record.filter((val) => val.id != id);
        localStorage.setItem('user', JSON.stringify(d));
        setRecord(d);
        toast.error("delete user successfully..");
    }
    const editUser = (id) => {
        setEdit(id)
    }
    useEffect(() => {
        setName(edit.name)
        setPhone(edit.phone)
    }, [edit])

    const update = (id, update) => {
        let up = record.map((val) => {
            if (val.id == id) {
                val.name = update.name;
                val.phone = update.phone;
            }
            return val;
        })
        localStorage.setItem('user', JSON.stringify(up));
        setRecord(up);
        toast("update successfully..");
        setEdit("");
    }

    const multitpleDelete = (id, checked) => {
        let all = [...mdelet];
        if (checked) {
            all.push(id);
        } else {
            all = all.filter((val) => val != id);
        }
        setmdelet(all);
    }
    const allDelete = () => {
        if (mdelet.length === 0) {
            toast("minimum 1 row selected...");
            return false;
        }

        let all = record.filter((val) => !mdelet.includes(val.id));
        localStorage.setItem('user', JSON.stringify(all));
        setRecord(all);
    }
    const multitpleStatus = (id, checked) => {
        let all = [...mstatus];
        if (checked) {
            all.push(id);
        } else {
            all = all.filter((val) => val != id);
        }
        setmStatus(all)
    }
    const allStatus = () => {
        if (mstatus.length == 0) {
            toast("minimum 1 row selected...");
            return false;
        }

        let allS = record.map((val) => {
            if (mstatus.includes(val.id)) {
                if (val.status === "active") {
                    val.status = "deactive"
                } else {
                    val.status = "active"
                }
            }
            return val;
        })
        localStorage.setItem('user', JSON.stringify(allS));
        setRecord(allS);
        setmStatus([]);
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <form onSubmit={handle} className='bg-info p-5 d-flex justify-content-between'>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name || ""} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <input type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone || ""} />
                            </div>

                            <div className="mt-2">
                                <button type="submit" className="btn btn-light btn-sm submitBtn">{edit ? "edit" : "submit"}</button>
                            </div>
                        </form>

                    </div>
                    <div className="col-lg-12">
                        <View
                            record={record}
                            deleteUser={deleteUser}
                            editUser={editUser}
                            multitpleDelete={multitpleDelete}
                            allDelete={allDelete}
                            multitpleStatus={multitpleStatus}
                            allStatus={allStatus}
                            mstatus={mstatus}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    )
}

export default Add
