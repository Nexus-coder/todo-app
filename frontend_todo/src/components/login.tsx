import toast from 'react-hot-toast';


const Login = () => {
    const googleLogin = () => {
        window.open('https://localhost:3000/auth/google', '_self');
    };
    const googleLogout = async () => {
        const res = await fetch('https://localhost:3000/auth/logout');
        if (res.ok) {
            toast('Successfully logged out');
        } else {
            toast("Something went wrong");
        }
    };

    return (
        <div>
            <h1>Login with Google</h1>
            <button onClick={googleLogin}>Sign In with Google</button>
            <button onClick={googleLogout}>Log Out</button>
        </div>
    );
};

export default Login;
