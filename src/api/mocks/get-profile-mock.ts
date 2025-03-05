import { http, HttpResponse } from "msw";
import { GetProfileResponse} from "../get-profile"



export const getProfileMock = http.get<
never,
never,
GetProfileResponse
>('/me', () => {

    return HttpResponse.json({
        id: 'custom-user-id',
        name: 'Yan',
        email: 'yanpedro@example.com',
        phone: '4235634623',
        role: "manager",
        createdAt: new Date(),
        updatedAt: null,
    })
})