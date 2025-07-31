export default async function UaerProfile({params}: any){

    const {id} = await params

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <p className="text-3xl">Profile Id: {params.id}</p>
        </div>
    )
}