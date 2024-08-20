import React, { useContext, useEffect, useState } from 'react'

import Select from 'react-select';
import { db, storage } from '../api';
import toast from 'react-hot-toast';
import { ID } from 'appwrite';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuthContext } from './AuthContext';

const colorStyles = {
    option: (styles, { data }) => {

        return {
            ...styles,
            backgroundColor: "#1c1c24"
        };
    }
};





const EditProject = () => {
    const { credentials } = useContext(UserAuthContext)
    const { database, project_collection, project_bucket, tag_collection } = credentials
    const [tag, setTag] = useState([])
    const [image, setImage] = useState()
    const navigation = useNavigate()
    let { id } = useParams();


    const [selectedOptions, setSelectedOptions] = useState([]);

    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        tag: [],
        link: ''
    })

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleSelect = (selected) => {
        setSelectedOptions(selected);
        const tagvalue = []
        selected.map(val => tagvalue.push(val.value))

        setForm({ ...form, ["tag"]: tagvalue })

    }

    const handleSubmit = async (e) => {
        const tagvalue = []
        selectedOptions.map(val => tagvalue.push(val.value))

        e.preventDefault()
        try {

            await db.updateDocument(
                database,
                project_collection,
                form.id,
                {
                    title: form.title,
                    description: form.description,
                    tag: tagvalue,
                    link: form.link,
                    image: form.image
                }

            );
            setForm({
                title: '',
                description: '',
                image: '',
                tag: [],
                link: ''
            })

            toast.success("Certificate updated 🎉");



        } catch (error) {
            console.error("DB ERROR >>", error);
            toast.error("Encountered an error ❌");
        }
    }

    const loadData = async (id) => {
        const response = await db.getDocument(database, project_collection, id);
        if (response) {
            setForm({ title: response.title, description: response.description, image: response.image, tag: response.tag, link: response.link, id: response.$id })
            setSelectedOptions(response.tag.map(({ $id, name, color }) => ({

                value: $id,
                label: <p className={`${color}`}>{name}</p>

            })));

        }

        if (response.image) {
            getImageById(response.image)
        }


    }







    const loadTag = async () => {
        const response = await db.listDocuments(database, tag_collection)
        const res = response.documents.map(({ $id, name, color }) => ({

            value: $id,
            label: <p className={`${color}`}>{name}</p>

        }));

        setTag(res)
    }
    const handleFile = async (e) => {
        const { target } = e
        const { name } = target


        if (e.currentTarget.files[0]) {

            const response = await storage.createFile(
                project_bucket,
                ID.unique(),
                e.currentTarget.files[0])


            setForm({
                ...form,
                [name]: response.$id,
            });


        }



    }

    async function getImageById(fileId) {
        try {
            const file = await storage.getFileView(project_bucket, fileId);
            setImage(file);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    }
    useEffect(() => {
        if (!tag.length > 0) {
            loadTag()

        }

    }, [tag])

    useEffect(() => {
        if (id) {
            loadData(id)

        }

    }, [id])







    return (

        <div className="w-full py-10">

            <div className="bg-[#1c1c24] rounded-lg py-6 shadow relative dark:bg-gray-700">

                <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-medium text-white">Create Project</h3>
                    <div>

                        <input type="title" name="title" id="title" value={form.title} className="w-full py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" placeholder="Project title" required="" onChange={handleChange} />
                    </div>
                    <div>

                        <textarea rows={7} name="description" id="description" value={form.description} placeholder="Project Description" className="w-full py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" required="" onChange={handleChange} />

                    </div>
                    <Select
                        closeMenuOnSelect={false}
                        value={selectedOptions}
                        onChange={handleSelect}
                        name="tag"
                        isMulti
                        options={tag}
                        styles={colorStyles}
                    />
                    <div className='flex items-center justify-center  mt-16 gap-6'>
                        <input name="image" onChange={handleFile} className=" bg-[#1c1c24] p-4 text-secondary m-2" type="file" />
                        <img src={image} className='w-20 h-20' alt="" />
                    </div>
                    <div>

                        <input type="text" name="link" id="link" className="w-full py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" placeholder="Project link" required="" onChange={handleChange} value={form.link} />
                    </div>
                    <div className="flex  gap-6">
                        <button
                            type='submit'
                            className='bg-gray-400 py-3 px-8 rounded-xl outline-none w-fit text-white  shadow-md shadow-primary'
                        >Update</button>
                        <div className=" py-3 px-8 rounded-xl outline-none w-fit text-white  cursor-pointer shadow-md shadow-primary " onClick={() => navigation('/project')}>Close</div>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default EditProject;