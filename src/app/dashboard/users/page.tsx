import {UserCard} from "@/components/dashboard/users/UserCard";
import {MOCK_USER} from "@/constants";

export default function UsersPage() {

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">Users</h1>

            <UserCard user={MOCK_USER}/>
        </div>
    )
}