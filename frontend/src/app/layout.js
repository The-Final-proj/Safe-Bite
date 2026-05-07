import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import BootstrapClient from "../components/BooststrapClient";

import { AuthProvider } from "@/context/AuthContext";
import { DependentProvider } from "@/context/DependentContext";

import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>
          <DependentProvider>

            <BootstrapClient />

            {children}

            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
            />

          </DependentProvider>
        </AuthProvider>

      </body>
    </html>
  );
}