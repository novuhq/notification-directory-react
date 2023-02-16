import slugify from 'slugify';

import TemplateInfo from 'components/pages/sub-category/template-info';
import {
  addSlugToCategories,
  addSlugToSubCategories,
  findCategoryBySlug,
  findSubCategoryBySlug,
} from 'utils';
import { getCategories, getSubCategories, getNotifications } from 'utils/api/queries';

const SubCategorySlug = async ({ params }) => {
  if (
    !params['category-slug'] ||
    !params['sub-category-slug'] ||
    !params.hasOwnProperty('notificationIndex')
  ) {
    return <>&nbsp;</>;
  }

  const {
    'category-slug': categorySlug,
    'sub-category-slug': subCategorySlug,
    notificationIndex,
  } = params;

  let categories = await getCategories();
  categories = addSlugToCategories(categories);
  const matchingCategory = findCategoryBySlug(categories, categorySlug);
  if (!matchingCategory) {
    return <>&nbsp;</>;
  }
  // eslint-disable-next-line no-underscore-dangle
  let subCategories = await getSubCategories(matchingCategory._id);

  subCategories = addSlugToSubCategories(subCategories);

  const matchingSubCategory = findSubCategoryBySlug(subCategories, subCategorySlug);

  const notifications = await getNotifications(matchingSubCategory._id);

  return (
    <TemplateInfo
      matchingCategory={matchingCategory}
      matchingSubCategory={matchingSubCategory}
      notifications={notifications}
      currentNotificationIndex={parseInt(notificationIndex)}
    />
  );
};

export async function generateStaticParams() {
  const categories = (await getCategories()).filter((f) => f._id && f.category);
  const getAll = (
    await Promise.all(
      categories
        .filter((f) => f.category && typeof f.category === 'string')
        .map(async (c) => {
          const sub = await getSubCategories(c._id);
          if (!Array.isArray(sub)) {
            return [];
          }
          return (
            await Promise.all(
              sub
                .filter((f) => f.subCategory)
                .map(async (current) => {
                  const notifications = await getNotifications(current._id);
                  if (!Array.isArray(notifications)) {
                    return [];
                  }
                  if (notifications.some((f) => !f.notification)) {
                    return [];
                  }
                  return notifications.reduce((all, current2, index) => {
                    const cat = slugify(c.category, { lower: true });
                    const subd = slugify(current.subCategory, { lower: true });
                    if (!cat || !subd || typeof cat !== 'string' || typeof subd !== 'string') {
                      return all;
                    }
                    return [
                      ...all,
                      {
                        'category-slug': cat,
                        'sub-category-slug': subd,
                        notificationIndex: String(index),
                      },
                    ];
                  }, []);
                }, [])
            )
          ).reduce((all, current) => [...all, ...current], []);
        })
    )
  ).reduce((all, current) => [...all, ...current], []);

  return getAll;
}

export default SubCategorySlug;

export const revalidate = 60;
