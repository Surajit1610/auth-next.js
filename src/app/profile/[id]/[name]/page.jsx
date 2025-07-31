export default function UaerProfile({params}){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <p className="text-3xl">Profile Id: {params.id}</p>
            <p className="text-3xl">Profile name: {params.name} </p>
        </div>
    )
}