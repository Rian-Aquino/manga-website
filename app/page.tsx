import { ComponentExample } from "@/components/component-example";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

console.log(session);

return <ComponentExample />;
}