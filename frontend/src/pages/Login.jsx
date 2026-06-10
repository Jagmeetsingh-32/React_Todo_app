import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button is clicked");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };
    return (
        <div className="h-screen bg-gray-50 flex items-center justify-center" >
            <div className=" p-6 w-96  rounded-lg   shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-3 flex justify-center">
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                
                <input className="border rounded-sm p-2 mb-3 w-full"
                    type="email" placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                />
                <input className="mb-3 border rounded-sm p-2 w-full"
                    type="password" placeholder="password"  value={password}
                    onChange={(e) =>
                            setPassword(e.target.value)
                        } />
                <button
                    type="submit"
                    className="w-full mb-3 h-9 hover:bg-blue-600 shadow-2xl rounded-2xl bg-blue-500 text-white">
                    Login</button>
                    </form>
                <p>Don't have account ? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link></p>
            </div>
        </div>
    )
}