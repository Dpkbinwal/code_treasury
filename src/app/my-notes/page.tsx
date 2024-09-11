import { UserButton } from "@clerk/nextjs"

const page = () => {
  return (
    <div>
      <header className="flex justify-between m-2">
            <h1 >Code Treasury</h1>
            <div className=" bg-white p-1 rounded">
            <UserButton showName  />
            </div>
          </header>
    </div>
  )
}

export default page