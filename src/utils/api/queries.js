const getCategories = async () => {
  const categoriesResponse = await fetch(`https://${process.env.REACT_APP_API}/categories/`);
  try {
    const categories = await categoriesResponse.json();
    return categories;
  }
  catch(e) {
    return [];
  }
};

const getSubCategories = async (categoryId) => {
  const subCategoriesResponse = await fetch(
    `https://${process.env.REACT_APP_API}/categories/${categoryId}/sub`
  );
  try {
    const subCategories = await subCategoriesResponse.json();
    return subCategories;
  }
  catch (err) {
    return [];
  }
};

const getNotifications = async (subCategoryId) => {
  const notificationsResponse = await fetch(
    `https://${process.env.REACT_APP_API}/sub/${subCategoryId}/notifications`
  );
  try {
    const notifications = await notificationsResponse.json();
    return notifications;
  }
  catch (err) {
    return [];
  }
};

export { getCategories, getSubCategories, getNotifications };
