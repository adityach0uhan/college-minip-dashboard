import "./globals.css";
import Sidebar from "../components/global/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-screen max-h-screen overflow-hidden bg-blue-100">
        
        <div className=" hidden md:flex w-full h-full ">
          <Sidebar />
          <div className="p-2 w-full h-full ">{children}</div>
        </div>
      </body>
    </html>
  );
}
