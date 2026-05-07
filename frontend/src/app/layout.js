import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "../components/BooststrapClient";
import { AuthProvider } from "@/context/AuthContext";
import { DependentProvider } from "@/context/DependentContext";


export default function RootLayout({ children }) {
  return (
    <html>
        <AuthProvider>
            <DependentProvider>
                <body>{children}</body>
            </DependentProvider>
                      
        </AuthProvider>

    </html>
  );
}
