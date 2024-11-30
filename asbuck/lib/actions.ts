"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import { writeClient } from "@/sanity/lib/write-client";

export const createIdea = async (state: any, form: FormData, idea: string) => {
    const session = await auth();
    if (!session) {
        return parseServerActionResponse({
            error: "Not Signed In",
            status: "ERROR"
        });
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'idea')
    )

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const newIdea = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session.id
            },
            idea
        }
        const result = await writeClient.create({ _type: 'idea', ...newIdea });
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    } catch (error) {

    }
}