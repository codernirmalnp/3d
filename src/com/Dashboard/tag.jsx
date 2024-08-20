import React, { useContext, useEffect, useRef, useState } from 'react'


import toast from 'react-hot-toast';
import { db } from '../api';
import { ID } from 'appwrite';
import { UserAuthContext } from './AuthContext';


const Tag = () => {
    const { credentials } = useContext(UserAuthContext)
    const { database, tag_collection } = credentials

    const formRef = useRef()
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState()
    const [tag, setTag] = useState([])
    const [form, setForm] = useState({
        name: "",
        color: "green-text-gradient",
    });


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!editId) {
            try {
                await db.createDocument(database, tag_collection, ID.unique(), { name: form.name, color: form.color });
                setForm({ name: '', color: 'green-text-gradient' })
                toast.success("Tag created 🎉");
                loadData()


            } catch (error) {
                console.error("DB ERROR >>", error);
                toast.error("Encountered an error ❌");
            }
            return

        }
        try {
            await db.updateDocument(database, tag_collection, editId, { name: form.name, color: form.color });
            setForm({ name: '', color: 'green-text-gradient' })
            setEditId("")
            toast.success("Tag updated🎉");
            loadData()


        } catch (error) {
            console.error("DB ERROR >>", error);
            toast.error("Encountered an error ❌");
        }




    }


    const handleChange = (e) => {
        e.preventDefault()
        const { target } = e;
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });

    };
    const loadData = async () => {
        const response = await db.listDocuments(database, tag_collection)
        setTag(response.documents)
    }

    const deleteTag = async (id) => {

        try {
            await db.deleteDocument(database, tag_collection, id)
            toast.success("Tag deleted 🎉");
            loadData()
        }
        catch (error) {
            console.error("DB ERROR >>", error);
            toast.error("Encountered an error ❌");

        }

    }

    useEffect(() => {
        loadData()

    }, [])

    return (
        <>
            <div className='w-full flex items-center justify-between flex-wrap'>
                <p className='text-bold text-[28px]'>Tag</p>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className=' flex flex-wrap gap-8'
                >
                    <input
                        required
                        type='text'
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        placeholder="whats the tag name?"
                        className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                    />




                    <div className='flex gap-8 px-2 bg-tertiary items-center justify-center'>
                        <label className='relative cursor-pointer'>
                            <input
                                name="color"
                                value="green-text-gradient"
                                type="radio"
                                className='peer hidden'
                                checked={form.color === "green-text-gradient"}
                                onChange={handleChange}
                            />
                            <span className='block h-4 w-4 rounded-full border-2 border-[#11998e] peer-checked:bg-[#11998e]'></span>
                        </label>

                        <label className='relative cursor-pointer'>
                            <input name="color" type="radio" value="blue-text-gradient" checked={form.color == "blue-text-gradient"} className='hidden peer' onChange={handleChange} />
                            <span className='block h-4 w-4  rounded-full border-2 border-[#56ccf2] peer-checked:bg-[#56ccf2]'></span>

                        </label>
                        <label className='relative cursor-pointer'>
                            <input name="color" type="radio" value="pink-text-gradient" checked={form.color == "pink-text-gradient"} className='hidden peer' onChange={handleChange} />
                            <span className='block h-4 w-4 rounded-full border-2  border-[#ec008c] peer-checked:bg-[#ec008c]'></span>

                        </label>




                    </div>





                    <button
                        type='submit'
                        className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white  shadow-md shadow-primary'
                    >{editId ? "Update tag" : "Create Tag"}</button>


                </form>


            </div>
            <div className='grid sm:grid-cols-3 grid-cols-1  gap-4 sm:gap-x-16 mt-24'>
                {tag.map((item, index) => (
                    <div key={index} className={` bg-[#1d1836] p-5 rounded-2xl sm:w-[360px] w-full flex items-center justify-between`}>
                        <p className={`${item.color} text-[24px] font-bold`}>{item.name}</p>
                        <div className="p-3 flex gap-2 ">
                            <button className="text-slate-800 hover:text-blue-600 text-sm bg-green-200  border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => {
                                setForm({ name: item.name, color: item.color })
                                setEditId(item.$id)
                            }}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLineCap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </span>
                                <span>Edit</span>
                            </button>
                            <button className="text-slate-800 hover:text-blue-600 text-sm bg-red-200 hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" onClick={() => {
                                if (editId) {
                                    setEditId(null)
                                    setForm({
                                        name: "",
                                        color: "green-text-gradient",
                                    })


                                }
                                deleteTag(item.$id)
                            }}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLineCap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>


                ))}
            </div>


        </>
    )
}

export default Tag