import { auth } from "@/auth";
import IdeaForm from "@/components/IdeaForm";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth()
    if (!session) redirect("/");
    return (
        <>
            <section className="grey_container !min-h-[230px]">
                <h1 className="heading">NEW IDEA EVERYDAY</h1>
            </section>
            <IdeaForm />
        </>
    )
};

export default Page;