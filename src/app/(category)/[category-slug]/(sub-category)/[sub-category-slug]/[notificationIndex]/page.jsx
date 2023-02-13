import TemplateInfo from 'components/pages/sub-category/template-info';
import {
  addSlugToCategories,
  addSlugToSubCategories,
  findCategoryBySlug,
  findSubCategoryBySlug,
} from 'utils';
import { getCategories, getSubCategories, getNotifications } from 'utils/api/queries';

const SubCategorySlug = async ({ params }) => {
  if (!params['category-slug'] || !params['sub-category-slug'] || !params.notificationIndex) {
    return <></>;
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
    return <></>;
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

export default SubCategorySlug;

export const revalidate = 60;
