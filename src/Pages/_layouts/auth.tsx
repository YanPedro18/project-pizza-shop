import { Outlet } from "react-router-dom"
import { Pizza } from "lucide-react"
function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased">

      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">
        {/* //logo */}
        <div className="flex items-center text-foreground gap-3">
          <Pizza className="h-6" />
          <span className="font-semibold">Pizza Shop</span>
          </div>

        {/* //copyright */}
        <footer className="text-small">
            <p>Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()} </p>
        </footer>

      </div>

 

        <div className="flex justify-center items-center flex-col rela">
            <Outlet />
        </div>

    </div>
  )
}

export default AuthLayout