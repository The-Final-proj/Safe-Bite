import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
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
                    <CartProvider>
                       <body>{children}</body>  
                    </CartProvider>
                    <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    />      
                </AllergensProvider>
            </DependentProvider>
        </AuthProvider>

      </body>
    </html>
  );
}