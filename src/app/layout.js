import "./globals.css";
import Sidebar from "../components/global/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-screen max-h-screen overflow-hidden bg-zinc-100">
        <div className="md:hidden w-screen h-screen px-6 flex justify-center items-center text-lg">Use Laptop/Destop or Enable Desktop Mode in your browser </div>
        <div className=" hidden md:flex w-full h-full ">
          <Sidebar />
          <div className="p-2 w-full h-full ">{children}</div>
        </div>
      </body>
    </html>
  );
}
