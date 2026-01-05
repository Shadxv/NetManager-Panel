import {ControlBar, UserList} from "@/components/dashboard/users";
import {UsersProvider} from "@/components/dashboard/users/UsersContext";

export default function UsersPage() {
    return (
        <UsersProvider>
            <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">Users</h1>
                <ControlBar/>
                <UserList/>
            </div>
        </UsersProvider>

    )
}