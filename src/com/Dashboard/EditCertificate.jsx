import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../api'
import { ID } from 'appwrite'
import toast from 'react-hot-toast'
import { UserAuthContext } from './AuthContext'

const EditCertificate = ({ showModal, loadData, editId }) => {
    const { credentials } = useContext(UserAuthContext)
    const { database, certificate_collection, certificate_bucket } = credentials



    const [form, setForm] = useState({
        id: editId?.$id,
        title: editId?.title,
        description: editId?.description,
        image: editId?.image,

    })
    const [loading, setLoading] = useState(false)
    const deleteFile = async (fileId) => {
        try {
            await storage.deleteFile(certificate_bucket, fileId)
        } catch (error) {
            console.error('Failed to delete file:', error);
        }
    };
    const [image, setImage] = useState()
    const handleFile = async (e) => {
        const { target } = e
        const { name } = target
        if (form.image) {
            deleteFile(form.image)
        }

        if (e.currentTarget.files[0]) {
            setLoading(true)

            const promise = storage.createFile(
                certificate_bucket,
                ID.unique(),
                e.currentTarget.files[0])
            promise.then(function (response) {
                setForm({
                    ...form,
                    [name]: response.$id,
                });
                setLoading(false)

            }, function (error) {
                toast.error("file Upload Failed")// Failure
                setLoading(false)
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

            await db.updateDocument(
                database,
                certificate_collection,
                form.id,
                {
                    title: form.title,
                    description: form.description,
                    image: form.image,
                }

            );

            toast.success("Certificate updated 🎉");
            showModal(false)
            loadData()

        } catch (error) {
            console.error("DB ERROR >>", error);
            toast.error("Encountered an error ❌");
        }


    }
    async function getImageById(fileId) {
        try {
            const file = await storage.getFileView(certificate_bucket, fileId);
            setImage(file);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    }
    useEffect(() => {
        if (editId?.image) {
            getImageById(editId?.image)
        }


    }, [editId?.image])



    return (
        <div className="z-100 fixed inset-0  w-full    bg-[#1c1c24] p-6 shadow-lg ">
            <form onSubmit={handleSubmit} className="flex flex-col mt-24 p-24">
                <input name="title" className=" placeholder:text-secondary text-white rounded-lg font-medium border-none  p-2 mb-4 outline-none" placeholder="Title" type="text" onChange={handleChange} value={form.title} />
                <textarea name="description" className="description  p-3 h-60  placeholder:text-secondary text-white  border-none outline-none" placeholder="Describe everything about this post here" onChange={handleChange} value={form.description}></textarea>


                <div className='flex items-center justify-center  mt-16 gap-6'>
                    <input name="image" onChange={handleFile} className=" bg-[#1c1c24] p-4 text-secondary m-2" type="file" />
                    <img src={image} className='w-20 h-20' alt="" />
                </div>



                {/* <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div> */}


                <div className="buttons flex justify-end gap-3">
                    <button className={` ${loading && 'cursor-not-allowed'}py-3 px-8 rounded-xl outline-none w-fit text-white  cursor-pointer  shadow-md shadow-primary`} type="submit">Update</button>
                    <div className=" py-3 px-8 rounded-xl outline-none w-fit text-white  cursor-pointer shadow-md shadow-primary " onClick={() => showModal(false)}>Close</div>

                </div>
            </form>
        </div>
    )
}

export default EditCertificate