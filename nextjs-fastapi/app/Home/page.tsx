import SideBar from "../../Components/SideBar";
import ChatBox from "../../Components/ChatBox";
export default function Home() {
    return (
        // <div className="flex flex-col items-center justify-center h-screen">
        //     Welcome to the Nursai, a platoform that streamline medical checking-in.
        // </div>
        <div className="flex flex-row items-start justify-start h-screen">
            <SideBar />
            <ChatBox />
        </div>
    )
}