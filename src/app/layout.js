import "./globals.css";
import Sidebar from "../components/global/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-screen min-h-screen overflow-x-hidden bg-zinc-100">
        <div className="md:hidden w-screen h-screen px-6 flex justify-center items-center text-lg">Use Laptop/Destop or Enable Desktop Mode in your browser </div>
        <div className="flex min-w-44 overflow-hidden h-full ">\
          <Sidebar />
          <div className="w-full overflow-x-hidden h-full ">{children}</div>
        </div>
      </body>
    </html>
  );
}
