
function Unauthorized() {
    return (
        <div className="px-4 py-8 text-center staatliches bg-[#EEFCFF] min-h-screen">
            <h1 className="text-5xl mb-4">Unauthorized</h1>
            <p className="text-2xl">You do not have permission to view this page.</p>
            
            <div className="flex justify-center items-center h-full">
                <img
                    src='../../img/stop.jpg' alt='Stop' 
                />
            </div>
        </div>
    );
}

export default Unauthorized;