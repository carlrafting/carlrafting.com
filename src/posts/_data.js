/**
 * @param {Lume.Page} page
 * @returns {string|undefined} slug url if it exists
 */
export const url = (page) => {
  const { basename, slug } = page.data;
  // return `/post/${slug ? slug : basename}/`;
  return `/${slug ? slug : basename}/`;
};
