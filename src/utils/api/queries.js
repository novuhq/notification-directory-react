let categories = undefined;
const getCategories = async () => {
  try {
    if (categories) {
      return categories;
    }
    const categoriesResponse = await fetch(`https://${process.env.REACT_APP_API}/categories/`);
    categories = await categoriesResponse.json();
    return categories;
  }
  catch(e) {
    return [];
  }
};

const getSubCategories = async (categoryId) => {
  try {
    const subCategoriesResponse = await fetch(
        `https://${process.env.REACT_APP_API}/categories/${categoryId}/sub`
    );
    const subCategories = await subCategoriesResponse.json();
    return subCategories;
  }
  catch (err) {
    return [];
  }
};

const getNotifications = async (subCategoryId) => {
  try {
    const notificationsResponse = await fetch(
        `https://${process.env.REACT_APP_API}/sub/${subCategoryId}/notifications`
    );
    const notifications = await notificationsResponse.json();
    return notifications;
  }
  catch (err) {
    return [];
  }
};

export { getCategories, getSubCategories, getNotifications };
