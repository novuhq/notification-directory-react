import HeadMetaTags from 'components/shared/head-meta-tags';
import { MAIN_TITLE, SEPARATOR } from 'constants/seo';
import {
  addSlugToCategories,
  addSlugToSubCategories,
  findCategoryBySlug,
  findSubCategoryBySlug,
} from 'utils';
import { getCategories, getSubCategories } from 'utils/api/queries';

const Head = async ({
  params: { 'category-slug': categorySlug, 'sub-category-slug': subCategorySlug },
}) => {
  let categories = await getCategories();
  categories = addSlugToCategories(categories);
  const matchingCategory = findCategoryBySlug(categories, categorySlug);
  // eslint-disable-next-line no-underscore-dangle
  let subCategories = await getSubCategories(matchingCategory._id);

  subCategories = addSlugToSubCategories(subCategories);

  const matchingSubCategory = findSubCategoryBySlug(subCategories, subCategorySlug);

  const title = `${MAIN_TITLE}${SEPARATOR}${matchingCategory.category}${SEPARATOR}${matchingSubCategory.subCategory}`;
  return <HeadMetaTags title={title} description={matchingSubCategory.description} />;
};

export default Head;
