"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from 'zod'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createIdea } from "@/lib/actions";

const IdeaForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [idea, setIdea] = useState("");
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                idea
            }
            await formSchema.parseAsync(formValues);
            console.log(formValues);
            const result = await createIdea(prevState, formData, idea);
            if (result.status == "SUCCESS") {
                toast({ title: 'Success', description: 'Idea created & published.' })
                router.push(`/idea/${result._id}`)
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                toast({ title: 'Error', description: "Please check your input", variant: "destructive" })
                return { ...prevState, error: 'validation failed', status: "ERROR" }
            }
            return {
                ...prevState,
                error: "unexpected error",
                status: "ERROR"
            }
        } finally {

        }
    };
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });
    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Title..."
                />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Description..."
                />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Category..."
                />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Image Link..."
                />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="idea" className="startup-form_label">Idea</label>
                <MDEditor
                    value={idea}
                    onChange={(value) => setIdea(value as string)}
                    id="idea"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{ placeholder: "Enter your idea" }}
                    previewOptions={{ disallowedElements: ["style"] }}
                    autoCapitalize="off"
                />
                {errors.idea && <p className="startup-form_error">{errors.idea}</p>}
            </div>
            <Button type="submit" className="startup-form_btn" disabled={isPending}>
                {isPending ? "Submitting..." : "SUBMIT"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    )
};

export default IdeaForm;