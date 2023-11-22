import Login from "../components/LoginForm";
import Providers from "../components/Providers";

const login = () => {

  return (
    <main className="flex flex-col gap-5">
        <h1>Login</h1>
        <Login/>
        <Providers/>
    </main>
  )
}

export default login