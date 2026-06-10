import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/auth/register", {
                name,
                email,
                password,
            }
            );
            alert(response.data.message);
            navigate("/");
        }
        catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };


    return (
        <div className="h-screen flex items-center justify-center">
            <div className=" p-6 w-96 shadow-lg rounded-2xl  ">
                <h2 className="text-2xl flex justify-center mb-3 ">Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="email" placeholder="Email"
                        className="p-2 w-full border mb-3 rounded-sm h-9"
                        value={email} 
                        onChange={(e)=>
                            setEmail(e.target.value)
                        }/>
                    <input type="text" placeholder="Name"
                        className="p-2 w-full border mb-3 h-9 rounded-sm"
                        value={name}
                        onChange={(e)=>
                            setName(e.target.value)
                        } />
                    <input type="password" placeholder="Password"
                        className="p-2 w-full border h-9 rounded-sm mb-3"
                        value={password}
                        onChange={(e)=>
                            setPassword(e.target.value)
                        } />
                    <button type="submit"
                        className="w-full mb-3 text-white bg-green-500 rounded-2xl h-9
                 hover:bg-green-700 hover:shadow-2xl">
                        Register</button>
                </form>
                <p className="mb-4">Already have account ? <Link to="/"
                    className="text-blue-500 hover:text-blue-700">Login</Link></p>
            </div>
        </div>
    )
}