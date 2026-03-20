export function toSlug(str: string): string {
    return str
        .toLowerCase()
        .replace(/[\u2013\u2014]/g, "-") // en-dash and em-dash → hyphen
        .replace(/[^a-z0-9-]/g, "-") // anything else → hyphen
        .replace(/-+/g, "-") // collapse multiple hyphens
        .replace(/^-|-$/g, ""); // trim leading/trailing hyphens
}

