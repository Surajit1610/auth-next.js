export default async function UaerProfile({params}){

    const {id} = await params

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <p className="text-3xl">Profile Id: {id}</p>
        </div>
    )
}