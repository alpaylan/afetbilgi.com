import slugify from "slugify";

export const slug = (text: string) => {
    return slugify(text, {
        trim: true
    })
}