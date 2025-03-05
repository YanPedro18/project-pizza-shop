import { Building, ChevronDown, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getManagedRestaurant } from "@/api/get-managed-restaurant"
import { getProfile } from "@/api/get-profile"
import { Skeleton } from "./ui/skeleton"
import { Dialog, DialogTrigger } from "./ui/dialog"
import StoreProfileDialog from "./store-profile-dialog"
import { SignOut } from "@/api/signout"
import { Navigate, useNavigate } from "react-router-dom"




function AccountMenu() {

  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity
  })

  const { data: ManagedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const { mutateAsync: logoutSystem, isPending: isSignOut } = useMutation({
    mutationFn: SignOut,
    onSuccess() {
      navigate("/sign-in", { replace: true })
    },
  })

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className="flex items-center gap-2 select-none">
              {/* Pizza Shop */}
              {isLoadingManagedRestaurant ? <Skeleton className="h-4 w-40" /> : ManagedRestaurant?.name}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">

            <DropdownMenuLabel className="flex flex-col">
              {isLoadingProfile ? (
                <div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ) : (
                <>
                  <span>{profile?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                </>
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className="w-4 h-4 mr-2" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSignOut}>

              <button className="w-full" onClick={() => logoutSystem()}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sair</span>
               
              </button>

            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        <StoreProfileDialog />
      </Dialog>
    </div>
  )
}

export default AccountMenu