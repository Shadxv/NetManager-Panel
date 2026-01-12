import {getTranslations} from "next-intl/server";
import {RequestError, RoleDetails, UserDetails} from "@/types";
import axios from "axios";
import {RESTAPI_URL} from "@/constants";
import {Avatar} from "@/components/AvatarComponent";
import {getUserSubtext} from "@/utils";
import {UserDetailsPane, UserForm} from "@/components/dashboard/users";

interface UserDetailsProp {
    params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({params}: UserDetailsProp) {
    const id = (await params).id;

    const user: UserDetails | RequestError = await axios.get<UserDetails>(`${RESTAPI_URL}/users/${id}`, { timeout: 5000 })
        .then((res) => {
            return res.data;
        }).catch((e) => {

            const status = (e.response && e.response.status) || (e.code === 'ECONNABORTED' && 408);

            switch(status) {
                case 404:
                case 400: return new RequestError(404, "userNotFound")
                case 408: return new RequestError(408)
                default: return new RequestError()
            }
        });

    if (user instanceof RequestError) throw user;

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
            <UserDetailsPane user={user}/>
            <UserForm user={user}/>
        </div>
    )
}