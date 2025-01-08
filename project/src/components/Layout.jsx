import { ToastContainer } from "@/components/ui/toast"
import { ReactNode } from "react"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">ComfyShop</h1>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 ComfyShop. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  )
}
