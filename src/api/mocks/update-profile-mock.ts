import { http, HttpResponse } from 'msw';
import { UpdateProfileBody } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfileBody>(
    '/profile', 
    async ({ request }) => {

    const { name } = await request.json() as UpdateProfileBody;


    if(name === 'Pizza Yans') {

        return new HttpResponse(null, {status: 204})
    }

    return new HttpResponse(null, { status: 400 })
},

)
