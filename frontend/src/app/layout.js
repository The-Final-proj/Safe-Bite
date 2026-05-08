import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import BootstrapClient from "../components/BooststrapClient";
import { AuthProvider } from "@/context/AuthContext";
import { DependentProvider } from "@/context/DependentContext";
import { AllergensProvider } from "@/context/allergensContext";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>
          <DependentProvider>
            <AllergensProvider>

              <Navbar />

              {children}

              <ToastContainer />

            </AllergensProvider>
          </DependentProvider>
        </AuthProvider>

      </body>
    </html>
  );
}