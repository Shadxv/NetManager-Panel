import {BaseUser, RequestError, RoleDetails, UserDetails} from "@/types";
import axios from "axios";
import {RESTAPI_URL} from "@/constants";
import {UserDetailsPane, UserForm} from "@/components/dashboard/users";
import {cookies} from "next/headers";
import {formatDate} from "@/utils";

interface UserDetailsProp {
    params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({params}: UserDetailsProp) {
    const id = (await params).id;
    const cookieStore = await cookies();
    const token = cookieStore.get('nm_auth_token')?.value;

    const user: UserDetails | RequestError = await axios.get<UserDetails>(`${RESTAPI_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        timeout: 30000
    })
        .then((res) => {
            return res.data;
        }).catch((e) => {

            const status = (e.response && e.response.status) || (e.code === 'ECONNABORTED' && 408);

            switch(status) {
                case 404:
                case 400: return new RequestError(404, "userNotFound")
                case 408: return new RequestError(408)
                case 403: return new RequestError(403)
                default: return new RequestError()
            }
        });

    if (user instanceof RequestError) throw user;

    const createdBy: Partial<BaseUser> | undefined = await axios.get<Partial<BaseUser>>(`${RESTAPI_URL}/users/${user.createdBy}/created-by`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        timeout: 30000
    })
        .then((res) => {
            return res.data;
        }).catch(() => {
            return undefined;
        });

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
            <UserDetailsPane user={user}/>
            <UserForm user={user} createdBy={createdBy}/>
        </div>
    )
}