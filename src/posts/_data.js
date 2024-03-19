/**
 * @param {Lume.Page} page
 * @returns {string|undefined} slug url if it exists
 */
export const url = (page) => {
  const { slug } = page.data;
  if (slug) {
    return `/post/${slug}/`;
  }
};
