import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Table from "../pages/Table";
import Update from "../pages/Update";
import Main from "./Main";

export const router = createBrowserRouter([
    {
        path: '*',
        element: <Error></Error>
    },
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Table></Table>
            },
            {
                path: '/edit/:id',
                element: <Update></Update>
            }

        ]
    },
])