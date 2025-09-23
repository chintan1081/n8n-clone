import type { SideElementsProp } from "./Dashboard";
import { useNavigate } from "react-router-dom";
type SidebarProps = {
    sideElements: SideElementsProp[],
    currentTitle: string,
    setCurrentTitle: (title: string) => void,
}
const Sidebar = ({ sideElements, currentTitle, setCurrentTitle }: SidebarProps) => {
    const navigate = useNavigate()
    const HandleNavigation = (path: string) => {
        navigate(`${path}`)
    }

    return (
        <div className="border">
            <div className="p-4 flex gap-4 items-center border-b font-semibold">
                <div className="bg-gradient-to-r rounded from-violet-500 to-blue-800 p-1">n8n</div>
                n8n
            </div>
            {sideElements.map((sideElement, index) => <div key={index} className="p-2">
                <div className={`flex gap-4 items-center cursor-pointer hover:bg-gray-800 
                                p-2 rounded font-semibold ${sideElement.title == currentTitle && 'bg-gray-800'}`}
                    onClick={() => {
                        setCurrentTitle(sideElement.title)
                        HandleNavigation(sideElement.path)
                        }} >
                    <div className="text-2xl">{sideElement.logo}</div>
                    {sideElement.title}
                </div>
            </div>)}
        </div>
    )
}

export default Sidebar
