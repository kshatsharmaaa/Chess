import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();
    return <div className="flex justify-center">
        <div className="pt-8 mt-16">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src={"/chessboard.png"} alt="" className="max-w-108" />
                </div>
                <div className="pt-16">
                    <div className="flex justify-center">
                        <h1 className="text-4xl font-bold">Play Chess Online on the #2 Site!</h1>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Button onClick={() => {
                            navigate("/game")
                        }} >Play Online</Button>
                    </div>

                </div>
            </div>
        </div>
    </div>
}