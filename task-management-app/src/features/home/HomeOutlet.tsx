import { Outlet } from "react-router-dom";
import AppNavBar from "./AppNavBar";

function HomeOutlet() {
    return (
        <>
            <AppNavBar />
            <Outlet />
        </>
    );
}

export default HomeOutlet;