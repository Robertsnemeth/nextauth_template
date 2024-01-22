import { TbCircleLetterB } from "react-icons/tb";

export default function Home() {

  return (
    <main className="flex gap-[100px] min-h-screen items-center justify-center p-5">
      <TbCircleLetterB size="350" className="text-primary"/>
      <div className="flex flex-col gap-3">
        <h1 className="text-6xl">Bobby's Next.js App</h1>
        <h3 className="text-3xl">Welcome to nextauth-test!</h3>
      </div>
    </main>
  )
}
