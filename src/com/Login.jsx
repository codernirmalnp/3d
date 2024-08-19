import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";



import { styles } from "../styles";
// import  EarthCanvas  from "./canvas/EarthCanvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";


import toast from "react-hot-toast";

import { account } from "./api";
import { UserAuthContext } from "./Dashboard/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser, user, isLoading } = useContext(UserAuthContext)
    const formRef = useRef("");
    const navigate = useNavigate()



    const [form, setForm] = useState({

        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const promise = account.createEmailPasswordSession(form.email, form.password);
        promise.then((response) => {
            setUser(response);
            navigate("/dashboard")
            setLoading(false);

            toast.success("Login Success")
        }).catch(e => {
            setLoading(false)
            toast.error(e.message)

        })

    };

    useEffect(() => {
        if (user !== null) {
            navigate("/dashboard");
        }
    }, [user, navigate])





    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
            </div>
        </div>

    }

    return (
        <div
            className={`xl:mt-12 flex xl:flex-row flex-col-reverse items-center justify-center  gap-10  overflow-hidden`}
        >
            <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className='flex-[0.75] bg-black-100 p-8 rounded-2xl px-16'
            >
                <p className={styles.sectionSubText}>Login</p>


                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='mt-12 flex flex-col gap-8'
                >
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your Email</span>
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="What's your email?"
                            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your Password</span>
                        <input
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            placeholder="What's your password?"
                            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>

                    <button
                        type='submit'
                        className={`${loading && 'disabled'} bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary`}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </motion.div>

            {/* <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div> */}
        </div>
    );
};

export default SectionWrapper(Login, "");