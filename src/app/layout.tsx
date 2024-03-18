import Footer from "./Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Umag",
  description: "Stop by our shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*
         Ce scriu aici se aplica tutror elementelor din body de pe toate paginile
        max-w-7xl a sa nu se intinda pe tot ecranul indiferent de marime
        min-w-componenta nu scade sub o anumita marime indiferent de dimensiune
        m-auto ca sa centreze */}
        <SessionProvider>
          <Navbar />
          <main className="p-4 max-w-7xl min-w-[300px] m-auto">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
