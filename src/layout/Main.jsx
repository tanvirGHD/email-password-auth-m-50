import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";


const Main = () => {
    return (
        <div className="max-w-5xl mx-auto mt-6">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;