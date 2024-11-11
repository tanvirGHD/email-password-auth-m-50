import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [loginError, setLoginError] = useState('')
    const emailRef = useRef();


  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password);

    // reset status
    setSuccess(false)


    // Login user
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
    console.log(result.user)


    if(result.user.emailVerified){
        setLoginError('Please verify your email address.')
    }else{
        setSuccess(true)
    }


    })
    .catch(error =>{
        console.log(error.message);
    })

    };


    const handleForgetPassword = () => {
        console.log('get me email address', emailRef.current.value);
        const email = emailRef.current.value;

        if(!email){
            console.log('Please  provide a valid email address');
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(result => {
                alert('Password Reset email sent, Please check Your Email')
            })
        }
    }



    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                a id nisi.
            </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    ref={emailRef}
                    placeholder="email"
                    name= 'email'
                    className="input input-bordered"
                    required
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    required
                />
                <label onClick={handleForgetPassword} className="label">
                    <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                    </a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
            </form>
            <p className="py-5 text-center">New to this website please <Link to='/signUp' className="font-bold"> Sign Up </Link></p>
            {
                success && <p className="text-green-600 p-6">User Login Successful</p>
            }
            </div>
        </div>
        </div>
    );
};

export default Login;
