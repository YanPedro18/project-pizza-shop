import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerRestaurant } from "@/api/register-restaurant"

interface newFormData {
    estabelecimento: string,
    nome: string,
    email: string;
    celular: string

}
const signUpFormValidSchema = zod.object({

    estabelecimento: zod.string().min(1, "Informe o nome do seu estabelecimento"),
    nome: zod.string().min(1, "Informe o seu nome"),
    email: zod.string().email(),
    celular: zod.string().min(9, "informe seu celular"),

});

function SignUp() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(signUpFormValidSchema),

        defaultValues: {
            estabelecimento: '',
            nome: '',
            email: '',
            celular: '',
        }
    })

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant
    })

    async function handleGetInputValues(data: newFormData) {
        console.log(data);

      try {

          await registerRestaurantFn({
             restaurantName: data.estabelecimento,
             managerName: data.nome,
             email: data.email,
             phone: data.celular
          })

          toast.success("Restaurante Realizado com sucesso!", {
              action: {
                  label: 'Login',
                  onClick: () => navigate(`/sign-in?email=${data.email}`),
              }
          });
      } catch (error) {

        toast.error('Erro ao cadastrar projeto');
      }
    }
    return (
        <>
            <Helmet title="Cadastro" />

            <div className="p-8">

                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sign-in" >
                        Fazer login
                    </Link>
                </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">

                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="font-semibold text-2xl tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleGetInputValues)}>

                        <div className="space-y-2">
                            <Label htmlFor="estabelecimento">Seu estabelecimento</Label>

                            {/* <input className="border-r bg-muted min-w-80 min-h-8" type="text" /> */}
                            <Input id="estabelecimento" required type="estabelecimento" placeholder="Digite o nome do seu estabelecimento" {...register('estabelecimento')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nome">Seu nome</Label>

                            {/* <input className="border-r bg-muted min-w-80 min-h-8" type="text" /> */}
                            <Input id="nome" required type="nome" placeholder="Digite seu nome" {...register('nome')} />
                        </div>

                        {/* <label htmlFor="" className="text-sm">Seu e-mail</label> */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>

                            {/* <input className="border-r bg-muted min-w-80 min-h-8" type="text" /> */}
                            <Input id="email" required type="email" placeholder="Digite seu e-mail" {...register('email')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="celular">Seu celular</Label>

                            {/* <input className="border-r bg-muted min-w-80 min-h-8" type="text" /> */}
                            <Input id="celular" required type="number" placeholder="Digite o número do seu celular" {...register('celular')} />
                        </div>


                        <Button disabled={isSubmitting} type="submit" className="bg-destructive w-full text-foreground p-1 space-y-2 ">Finalizar Cadastro</Button>

                        {/* <div className="flex justify-center text-center ">
                            <span className="text-xs text-muted-foreground w-100 max-w-60 m-0">Ao continuar, você concorda com nossos Termos de serviço e políticas de privacidade.</span>
                        </div> */
                        }
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos! {' '}
                            <a className="underline underline-offset-4" href="">
                            termos de serviço
                            </a>{' '}
                            e{' '}
                            <a className="underline underline-offset-4" href="">
                                 políticas de privacidade
                            </a>
                            .
                        </p>
                    </form>

                </div>



            </div>

        </>
    )
}

export default SignUp;