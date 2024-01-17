import RegisterWidget from '../components/RegisterWidget'
import { HomeButton } from '../components/buttons'

const Register = () => {
  return (
        <main className='flex flex-col items-center gap-3 p-10'>
          <RegisterWidget/>
          <HomeButton/>
        </main>
        )
}

export default Register