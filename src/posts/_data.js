export const url = (page) => {
    const basename = page.data.basename;
    const slug = page.data.slug;
    return `/post/${slug}/`;
}
