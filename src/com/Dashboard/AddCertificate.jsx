import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../api'
import { ID } from 'appwrite'
import toast from 'react-hot-toast'
import { UserAuthContext } from './AuthContext'

const AddCertificate = ({ showModal, loadData }) => {
    const { credentials } = useContext(UserAuthContext)
    const { database, certificate_collection, certificate_bucket } = credentials


    const [form, setForm] = useState({
        title: '',
        description: '',
        image: ''
    })
    const handleFile = (e) => {
        const { target } = e
        const { name } = target


        if (e.currentTarget.files[0]) {

            const promise = storage.createFile(
                certificate_bucket ,
                ID.unique(),
                e.currentTarget.files[0])
            promise.then(function (response) {
                setForm({
                    ...form,
                    [name]: response.$id,
                });

            }, function (error) {
                toast.error("file Upload Failed")// Failure
            });
        }



    }

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await db.createDocument(database, certificate_collection, ID.unique(), { title: form.title, description: form.description, image: form.image });
            setForm({ title: '', description: '', image: '' })
            toast.success("Certificate created 🎉");
            showModal(false)
            loadData()

        } catch (error) {
            console.error("DB ERROR >>", error);
            toast.error("Encountered an error ❌");
        }


    }

    return (
        <div className="z-100 fixed inset-0  w-full    bg-[#1c1c24] p-6 shadow-lg ">
            <form onSubmit={handleSubmit} className="flex flex-col mt-24 p-24">
                <input name="title" className=" placeholder:text-secondary text-white rounded-lg font-medium border-none  p-2 mb-4 outline-none" placeholder="Title" type="text" onChange={handleChange} />
                <textarea name="description" className="description  p-3 h-60  placeholder:text-secondary text-white  border-none outline-none" placeholder="Describe everything about this post here" onChange={handleChange}></textarea>


                <input name="image" onChange={handleFile} className=" bg-[#1c1c24] p-4 text-secondary m-2" type="file" />


                {/* <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div> */}


                <div className="buttons flex justify-end gap-3">
                    <div className=" py-3 px-8 rounded-xl outline-none w-fit text-white  cursor-pointer shadow-md shadow-primary " onClick={() => showModal(false)}>Close</div>
                    <button className=" py-3 px-8 rounded-xl outline-none w-fit text-white  cursor-pointer  shadow-md shadow-primary" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddCertificate