"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button";
import { Send } from "lucide-react";

const IdeaForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [idea, setIdea] = useState("");
    const handleFormSubmit = () => { };
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });
    return (
        <form action={() => { }} className="startup-form">
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