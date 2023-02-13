let categories;
const getCategories = async () => {
  try {
    if (categories) {
      return categories;
    }
    const categoriesResponse = await fetch(`https://api.notifications.directory/categories/`);
    categories = await categoriesResponse.json();
    if (!Array.isArray(categories)) {
      categories = undefined;
      return [];
    }
    return categories;
  } catch (e) {
    return [];
  }
};

const getSubCategories = async (categoryId) => {
  try {
    console.log(categoryId);
    const subCategoriesResponse = await fetch(
      `https://api.notifications.directory/categories/${categoryId}/sub`
    );
    const subCategories = await subCategoriesResponse.json();
    if (!Array.isArray(subCategories)) {
      return [];
    }
    return subCategories;
  } catch (err) {
    return [];
  }
};

const getNotifications = async (subCategoryId) => {
  try {
    console.log(subCategoryId);
    const notificationsResponse = await fetch(
      `https://api.notifications.directory/sub/${subCategoryId}/notifications`
    );
    const notifications = await notificationsResponse.json();
    if (!Array.isArray(notifications)) {
      return [];
    }
    return notifications;
  } catch (err) {
    return [];
  }
};

export { getCategories, getSubCategories, getNotifications };
