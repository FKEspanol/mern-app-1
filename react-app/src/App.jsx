import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/auth/CreateUser";
import LogInUser from "./components/auth/LogInUser";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LogInUser />} />
                <Route path="/createUser" element={<CreateUser />} />
            </Routes>
        </>
    );
}

export default App;
