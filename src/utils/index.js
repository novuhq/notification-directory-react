import slugify from 'slugify';

import { getCategories, getSubCategories } from './api/queries';

const addSlugToCategories = (categories) => {
  const newCategories = categories;
  newCategories.forEach((category, index) => {
    newCategories[index].slug = slugify(category.category, { lower: true });
  });
  return newCategories;
};

const findCategoryBySlug = (categories, slug) =>
  categories.find((category) => category.slug === slug);

const addSlugToSubCategories = (subCategories) => {
  const newSubCategories = subCategories;
  newSubCategories.forEach((subCategory, index) => {
    newSubCategories[index].slug = slugify(subCategory.subCategory, { lower: true });
  });
  return newSubCategories;
};

const findSubCategoryBySlug = (subCategories, slug) =>
  subCategories.find((subCategory) => subCategory.slug === slug);

const getCategoriesWithAllSubCategories = async () => {
  const categories = await getCategories();
  // For each category, make a request to get the subcategories, queries can be async so we need to use Promise.all
  const promises = categories.map((category) => getSubCategories(category._id));
  // Once all the promises are resolved, we need to merge categories and subcategories into one array based matching _id from a category to category field in a subcategory
  const subCategories = await Promise.all(promises);
  const categoriesWithSubCategories = categories.map((category) => {
    // const subCategoriesForCategory = subCategories.find((subCategory) =>
    //   subCategory ? subCategory[0].category === category._id : false
    // );
    const subCategoriesForCategory = subCategories.find((subCategory) => {
      if (subCategory.length > 0) {
        return subCategory[0].category === category._id;
      }
      return false;
    });
    return {
      ...category,
      subCategories: subCategoriesForCategory,
    };
  });
  return categoriesWithSubCategories;
};

export {
  addSlugToCategories,
  findCategoryBySlug,
  addSlugToSubCategories,
  findSubCategoryBySlug,
  getCategoriesWithAllSubCategories,
};
