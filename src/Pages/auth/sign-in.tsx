import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { Link, useSearchParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/signin"

interface newFormData{
  email: string;
}
const signInFormValidSchema = zod.object({

  email: zod.string().email(),

});

function SignIn() {

  const [searchParams] = useSearchParams();

  const {register, handleSubmit, formState: { isSubmitting }} = useForm({
    resolver: zodResolver(signInFormValidSchema),

    defaultValues:{
      email: searchParams.get('email') ?? '',
    }
  })


  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    
  }) 
  
  async function handleGetEmail(data: newFormData) {
    try {
      await authenticate({ email: data.email })

    toast.success("Enviamos um link de autenticação para seu e-mail!", {
      action: {
        label: 'Reenviar',
        onClick: () => handleGetEmail(data),
      }
    });
    } catch (error) {
      
    }
  }
  return (
    <>
      <Helmet title="Login" />
      
       <div className="p-8">

        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up" >
            Novo estabelecimento
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">

         <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Acessar Painel</h1>
          <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel parceiro!</p>
         </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleGetEmail)}>
          {/* <label htmlFor="" className="text-sm">Seu e-mail</label> */}
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>

            {/* <input className="border-r bg-muted min-w-80 min-h-8" type="text" /> */}
            <Input id="email" required type="email" placeholder="Digite seu e-mail" {...register('email')} />
          </div>

        
          <Button disabled={isSubmitting} type="submit" className="bg-destructive w-full text-foreground p-1 space-y-2 ">Acessar painel</Button>
        </form>

        </div>

       

       </div>

    </>
  )
}

export default SignIn;