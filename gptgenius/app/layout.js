import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import GeneralProvider from "@/contexts/generalProvider";
import ToastReactQueryProvider from "@/contexts/toastRQProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPTGenius",
  description: "AI powered tour adviser app",
};

export default function RootLayout({ children }) {
  return (
    <GeneralProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastReactQueryProvider>{children}</ToastReactQueryProvider>
        </body>
      </html>
    </GeneralProvider>
  );
}
