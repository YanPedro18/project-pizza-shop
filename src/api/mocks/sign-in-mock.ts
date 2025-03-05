import { http, HttpResponse } from 'msw';
import { SignInBody } from '../signin'

export const signInMock = http.post<SignInBody>(
    '/authenticate', 
    async ({ request }) => {

    const { email } = await request.json() as SignInBody;


    if(email === 'johndoe@example.com')
    return new HttpResponse(null, {
        status: 200,
        headers: {
            'Set-Cookie': 'auth=samble-jwt'
        }
})

    return new HttpResponse(null, { status: 401 })
},

)
