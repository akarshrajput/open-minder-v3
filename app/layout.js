import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@components/Header";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Open Minder - Beyond Boundaries",
  description:
    "Openminder is an application for reading and writing blogs, news, stories, research, and many more...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Toaster position="bottom-right" reverseOrder={false} />

          <div className="w-full h-full dark:bg-stone-950 mx-auto my-0">
            <div className="sticky top-0 z-10">
              <Header />
            </div>
            <div className="mt-0 p-4">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
