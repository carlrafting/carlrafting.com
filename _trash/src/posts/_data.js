import { format } from "@std/datetime/format";

/**
 * @param {Lume.Page} page
 * @returns {string|undefined} slug url if it exists
 */
export const url = (page) => {
  const { basename, slug, date } = page.data;
  const urlDate = format(date, "yyyy/MM/dd");
  return `/${urlDate}/${slug ? slug : basename}/`;
};
