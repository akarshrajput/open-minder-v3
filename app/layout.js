import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Openminder : Beyond Boundaries",
  description:
    "Openminder is an application for reading and writting blogs, news, stories, research and many more...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="text-slate-700 w-full mx-auto my-0">
          <div className="sticky top-0 bg-white  z-10">
            <Header />
          </div>
          <div className="p-4 mt-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
