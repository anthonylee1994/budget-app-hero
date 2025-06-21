import ReactDOM from "react-dom/client";
import {App} from "./app.tsx";
import {Provider} from "./provider.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider>
        <App />
    </Provider>
);
