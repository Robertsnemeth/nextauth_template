import LoginWidget from "../components/LoginWidget";
import { HomeButton } from "../components/buttons";

const login = () => {

  return (
    <main className="flex flex-col gap-5 items-center p-5">
      <LoginWidget/>
      <HomeButton/>
    </main>
  )
}

export default login