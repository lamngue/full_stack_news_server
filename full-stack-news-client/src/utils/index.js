export const normalizeNewsEdit = (news) => {
  return { ...news, category: news.categoryIds };
};
