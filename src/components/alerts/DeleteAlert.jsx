
import { PiWarningCircle } from "react-icons/pi";

function DeleteAlert({ onConfirm, onCancel, name }) {
    return (
        <div className='fixed top-0 z-50 left-0 w-screen h-screen bg-[#00000088]'>
            <div className='absolute rounded-xl flex flex-col items-center gap-3 m-auto top-0 left-0 right-0 bottom-0 w-fit h-fit p-10 max-sm:p-5  bg-white'>
                <div className="rounded-full p-2 bg-[#FFF2F2] w-fit">
                    <div className="rounded-full p-[6px] bg-[#FFE5E2]">
                        <PiWarningCircle size={25} color="#D92D20" />
                    </div>
                </div>
                <h2 className="text-sub-title font-semibold">Delete {name.toLowerCase()}</h2>
                <p className="text-center max-sm:text-sm">
                    Are you sure you want to delete this {name.toLowerCase()}? <br /> This action cannot be undone.
                </p>
                <div className="flex w-full gap-4 mt-2 justify-between">
                    <button className="w-full rounded-lg py-2 border border-gray-400" onClick={onCancel}>Cancel</button>
                    <button className="w-full rounded-lg py-2 bg-[#D92D20] text-white" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlert