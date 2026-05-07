import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import BootstrapClient from "../components/BooststrapClient";

import { AuthProvider } from "@/context/AuthContext";
import { DependentProvider } from "@/context/DependentContext";
import { AllergensProvider } from "@/context/allergensContext";

import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>
<<<<<<< HEAD
            <DependentProvider>
                <AllergensProvider>
                    <body>{children}</body>                    
                </AllergensProvider>
            </DependentProvider>
=======
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
>>>>>>> upstream/main
        </AuthProvider>

      </body>
    </html>
  );
}