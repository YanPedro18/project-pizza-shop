import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { GetManagedRestaurantResponse, getManagedRestaurant } from '@/api/get-managed-restaurant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'

interface PropsFormProfileDialog {
    name: string;
    description: string  | null;
}


function StoreProfileDialog() {

    const queryClient = useQueryClient();

    const storeProfileSchemaValid = z.object({
        name: z.string().min(1),
        description: z.string().nullable(),
    })


    const { data: ManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })


    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<PropsFormProfileDialog>({
        resolver: zodResolver(storeProfileSchemaValid),

        values: {
            name: ManagedRestaurant?.name ?? '',
            description: ManagedRestaurant?.description ?? '',
        }
    });

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({ name, description }) {

            const { cached } = updateManagedRestaurantCache({name, description});

            return { previousProfile: cached }
            // //isso vai fazer com oque as informações na interface atualize em tempo real, apos fazermos as a tualizaçõse desses dados via req.
            // const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant']);

            // if(cached){
            //     queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
            //         ...cached,
            //         name,
            //         description,
            //     })
            // }
        },
        onError(_, __, context) {
            if (context?.previousProfile) {
                updateManagedRestaurantCache(context.previousProfile)
            }
        }
    })

    function updateManagedRestaurantCache({
        name,
        description
    }: PropsFormProfileDialog) {
        //isso vai fazer com oque as informações na interface atualize em tempo real, apos fazermos as a tualizaçõse desses dados via req.
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant']);

        if (cached) {
            queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
                ...cached,
                name,
                description,
            })
        }

        return { cached }
    }

    async function handleUpdateProfile(data: PropsFormProfileDialog) {

        try {
            await updateProfileFn({
                name: data.name,
                description: data.description
            })

            toast.success("Perfil atualizado com sucesso!")

        } catch (error) {
            toast.error("Falha ao atualizar o perfil, tente novamente.")
        }

    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>Atualize as informações do seu estabelecimento visíveis ao seu cliente</DialogDescription>
            </DialogHeader>

            <form action="" onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className='space-y-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='name'>
                            Nome
                        </Label>

                        <Input className='col-span-3' id='name' {...register('name')} />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='description'>
                            Descrição
                        </Label>

                        <Textarea className='col-span-3' id='description'  {...register('description')} />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant="ghost">Cancelar</Button>
                    </DialogClose>

                    <Button type='submit' variant="success" disabled={isSubmitting}>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

export default StoreProfileDialog