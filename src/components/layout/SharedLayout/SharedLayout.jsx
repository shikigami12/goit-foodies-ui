import { Outlet } from "react-router-dom";
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import {TextInput} from "../../common/TextInput/TextInput.jsx";
import { useState } from "react";
import {TextArea} from "../../common/TextArea/TextArea.jsx";

export const SharedLayout = () => {
    const [desc, setDesc] = useState("wedwedwedwedwedewdw");
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-4">
                <TextArea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />

                <TextArea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    error="Enter a description of the dish"
                />


                <TextInput value={desc} onChange={e => setDesc(e.target.value)} />

                <TextInput
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    error="Enter a description of the dish"
                />

                <TextInput
                    value=""
                    onChange={() => {}}
                    disabled
                />

                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

