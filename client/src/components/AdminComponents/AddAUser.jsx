import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/reducers/authreducer";

const AddAUser = ({ trigger, setTrigger }) => {

    const dispatch = useDispatch();

    const successMessage = useSelector(state => state.auth.successMessage)

    const [showPassword, setShowPassword] = useState(false);

    const [state, setState] = useState({
        accountName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
        admin: true,

    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        setTrigger(true)
        dispatch(register(state));


   
    };

    useEffect(()=> {

if(successMessage === "User registration successful!"){

    setState({
        accountName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
        admin: true,

    });
}

    },[ successMessage ])

    return (

        <form onSubmit={handleRegisterSubmit} style={{
            width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "white", color: "black", padding: "2vh 0"
        }}>

            <h2 style={{ textAlign: "center" }}><u>Add A User</u></h2>

            <label style={{ fontWeight: "bold" }}>Account Name</label>
            <input
                type="text"
                name="accountName"
                value={state.accountName}
                onChange={handleInput}
                placeholder="Account Name"
                required
                style={{ border: "solid lightgray", width: "90%" }}
            />

            <label style={{ fontWeight: "bold" }}>First Name</label>
            <input
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={handleInput}
                placeholder="First Name"
                style={{ border: "solid lightgray", width: "90%" }}
            />

            <label style={{ fontWeight: "bold" }}>Last Name</label>
            <input
                type="text"
                name="lastName"
                value={state.lastName}
                onChange={handleInput}
                placeholder="Last Name"
                style={{ border: "solid lightgray", width: "90%" }}
            />

            <label style={{ fontWeight: "bold" }}>Email</label>
            <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleInput}
                placeholder="Email"
                required
                style={{ border: "solid lightgray", width: "90%" }}
            />

            <label><b>Password</b></label>
            <div className="w-full text-center flex flex-row justify-center items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={state.password || ""}
                    onChange={handleInput}
                    placeholder="At least 8 characters - 1 uppercase letter - 1 lowercase letter & 1 number"
                    className="text-center"
                    style={{ border: "solid lightgray", width: "90%" }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <div
                            style={{ border: "solid lightgray", borderLeft: "none" }}
                            title="Hide Password"
                        >😲</div>
                    ) : (
                        <div
                            style={{ border: "solid lightgray", borderLeft: "none" }}
                            title="Show Password"
                        >😎</div>
                    )}
                </button>
            </div>

            <label><b>Re-enter Password</b></label>
            <div className="w-full text-center flex flex-row justify-center items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password2"
                    value={state.password2 || ""}
                    onChange={handleInput}
                    placeholder="********"
                    className="text-center"
                    style={{ border: "solid lightgray", width: "90%" }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <div
                            style={{ border: "solid lightgray", borderLeft: "none" }}
                            title="Hide Password"
                        >😲</div>
                    ) : (
                        <div
                            style={{ border: "solid lightgray", borderLeft: "none" }}
                            title="Show Password"
                        >😎</div>
                    )}
                </button>
            </div>


            <button className="rounded msgButton" type="submit" style={{ width: "70%", margin: "1vh" }}>Register User</button>

        </form>
    );
};

export default AddAUser
