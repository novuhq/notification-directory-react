import HeadMetaTags from 'components/shared/head-meta-tags';
import { MAIN_TITLE, SEPARATOR } from 'constants/seo';
import {
  addSlugToCategories,
  addSlugToSubCategories,
  findCategoryBySlug,
  findSubCategoryBySlug,
} from 'utils';
import { getCategories, getSubCategories } from 'utils/api/queries';

const Head = async ({ params: { 'category-slug': categorySlug } }) => {
  let categories = await getCategories();
  categories = addSlugToCategories(categories);
  const matchingCategory = findCategoryBySlug(categories, categorySlug);

  const title = `${MAIN_TITLE}${SEPARATOR}${matchingCategory.category}`;

  return <HeadMetaTags title={title} description={matchingCategory.description} />;
};

export default Head;
