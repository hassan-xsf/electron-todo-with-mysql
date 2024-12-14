import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "sonner";
import { App } from "./App";

function render() {
  const root = ReactDOM.createRoot(
    document.getElementById("app") as HTMLElement
  );
  root.render(
    <>
      <ThemeProvider>
        <App />
        <Toaster richColors duration={1500} />
      </ThemeProvider>
    </>
  );
}

render();
