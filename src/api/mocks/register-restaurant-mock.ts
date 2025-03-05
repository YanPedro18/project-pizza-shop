import { http, HttpResponse } from 'msw';
import { RegisterRestaurantBody } from '../register-restaurant'

export const registerRestarauntMock = http.post<RegisterRestaurantBody>(
    '/restaraunts', 
    async ({ request }) => {

    const { restaurantName } = await request.json() as RegisterRestaurantBody;


    if(restaurantName === 'Pizza Shop') {

        return new HttpResponse(null, {status: 201})
    }

    return new HttpResponse(null, { status: 400 })
},

)
