import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "../components/BooststrapClient";
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout({ children }) {
  return (
    <html>
        <AuthProvider>
          <body>{children}</body>            
        </AuthProvider>

    </html>
  );
}
