export const url = (page) => {
    const basename = page.data.basename;
    return `/post/${basename}/`;
}
