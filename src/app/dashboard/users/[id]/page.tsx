import {getTranslations} from "next-intl/server";
import {RequestError, RoleDetails, UserDetails} from "@/types";
import axios from "axios";
import {RESTAPI_URL} from "@/constants";
import {Avatar} from "@/components/AvatarComponent";

interface UserDetailsProp {
    params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({params}: UserDetailsProp) {
    const t = await getTranslations("Users");
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
        <div className="w-full h-full overflow-y-auto p-4 flex flex-col gap-4">
            <div className="w-full flex items-center justify-between flex-wrap">
                <div className="flex flex-wrap gap-8 items-center">
                    <Avatar size="size-32" src={user.avatar}/>
                    <div className="flex flex-col">
                        <h1 className="text-primary-black dark:text-primary-white text-4xl font-bold">{(!user.name || !user.surname) ? user.email : `${user.name} ${user.surname}`}</h1>
                        <h4 className="text-primary-gray dark:text-muted-white text-lg">{(!user.name || !user.surname) ? "Invite time" : user.email}</h4>
                    </div>
                </div>
                <div className="flex gap-4">

                </div>
            </div>
        </div>
    )
}