const getCategories = async () => {
  const categoriesResponse = await fetch('https://api.notifications.directory/categories/');
  const categories = await categoriesResponse.json();
  return categories;
};

const getSubCategories = async (categoryId) => {
  const subCategoriesResponse = await fetch(
    `https://api.notifications.directory/categories/${categoryId}/sub`
  );
  const subCategories = await subCategoriesResponse.json();
  return subCategories;
};

const getNotifications = async (subCategoryId) => {
  const notificationsResponse = await fetch(
    `https://api.notifications.directory/sub/${subCategoryId}/notifications`
  );
  const notifications = await notificationsResponse.json();
  return notifications;
};

export { getCategories, getSubCategories, getNotifications };
