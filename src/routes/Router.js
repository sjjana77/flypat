import React from "react";
import { BrowserRouter as Routerr, Route, Routes } from "react-router-dom";
import RegisterForm from '../components/RegisterForm';
import Login from '../components/Login';

const Router = () => {
    // const []
    return (
        <Routerr>
            {/* <Header /> */}
            <div style={{ margin: '0 20px' }}>
                <Routes>
                    <Route exact path="/" element={<RegisterForm />} />
                    <Route exact path="/login" element={<Login />} />
                </Routes>
            </div>
        </Routerr>
    )
}


export default Router;