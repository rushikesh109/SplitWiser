import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
 
const inter = Inter({ subsets: ["latin"]});
export const metadata = {
  title: "SplitWiser",
  description: "The smartest way to split expenses with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logos/logo-s.png" sizes="any" />
      <body
        className={`${inter.className}` }
      >
        <ClerkProvider>
<ConvexClientProvider>
  
        <Header />
       <main className="min-h-screen">
         {children}
         <Toaster richColors />
       </main>

       </ConvexClientProvider>
       </ClerkProvider>
      </body>
    </html>
  );
}
