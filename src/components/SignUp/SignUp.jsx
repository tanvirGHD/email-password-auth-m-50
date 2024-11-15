import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { BsEyeSlashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";



const SignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.name.value;
        const terms = event.target.terms.checked;
        console.log(email, password, name, photo, terms);

        //reset error and status
        setErrorMessage('')
        setSuccess(false);
        if(!terms){
            setErrorMessage('Please accept our terms and condition')
            return;
        }

        if(password.length < 6){
            setErrorMessage('Password should be 6 characters or longers')
            return;
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if(!passwordRegex.test(password)){
            setErrorMessage('Invalid password! The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setSuccess(true);

        //sent verification email address
        sendEmailVerification(auth.currentUser)
            .then(()=>{
            console.log('verification email sent');
            })

            // Update profile name and url
            const profile = {
                displayName: name,
                photoURl: photo,
            }
            updateProfile(auth.currentUser, profile)
            .then(() =>{
                console.log('User Profile Update er');
            })
            .catch(error => console.log('User profile update error'))
        })


        .catch(error =>{
            console.log(error.message);
            setErrorMessage(error.message)
            setSuccess(false)
        })
    }



    return (
            <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl mt-10">
            <h2 className="text-3xl my-5 text-center font-bold">Sign Up!</h2>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="User name"
                    className="input input-bordered"
                    required
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Photo URL</span>
                </label>
                <input
                    type="text"
                    name="photo"
                    placeholder="photo url"
                    className="input input-bordered"
                    required
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                />
                </div>
                <div className="form-control relative">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                />

                <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-xs absolute right-4 top-12">
                    {
                        showPassword ? <BsEyeSlashFill /> : <FaEye></FaEye>
                    }
                </button>

                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                    </a>
                </label>
                </div>

                {/* Trams amd Condition */}
                <div className="form-control">
                <label className="label justify-start gap-3 cursor-pointer">
                    <input type="checkbox" name="terms" className="checkbox" />
                    <span className="label-text">Accept Our Terms and Condition.</span>
                </label>
                </div>

                <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            <p className="py-5 text-center">Already have an account? Please <Link to='/login' className="font-bold"> Login </Link></p>
            {
                errorMessage && <p className="text-red-700 text-lg p-5">{errorMessage}</p>
            }
            {
                success && <p className="text-green-700 text-lg p-5">Sign Up is Successful.</p>
            }
            </div>
    );
    };

export default SignUp;
