import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "../components/BooststrapClient";
import { AuthProvider } from "@/context/AuthContext";
import { DependentProvider } from "@/context/DependentContext";
import { AllergensProvider } from "@/context/allergensContext";


export default function RootLayout({ children }) {
  return (
    <html>
        <AuthProvider>
            <DependentProvider>
                <AllergensProvider>
                    <body>{children}</body>                    
                </AllergensProvider>
            </DependentProvider>
        </AuthProvider>

    </html>
  );
}
