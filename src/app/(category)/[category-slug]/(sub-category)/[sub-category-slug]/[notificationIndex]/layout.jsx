import TemplateInfo from 'components/pages/sub-category/template-info';
import Link from 'components/shared/link';
import {
  addSlugToCategories,
  addSlugToSubCategories,
  findCategoryBySlug,
  findSubCategoryBySlug,
} from 'utils';
import { getCategories, getSubCategories, getNotifications } from 'utils/api/queries';

const SubCategoryLayout = async ({
  children,
  params: { 'category-slug': categorySlug, 'sub-category-slug': subCategorySlug },
}) => {
  if (!matchingSubCategory?._id) {
    return <></>;
  }
  let categories = await getCategories();
  categories = addSlugToCategories(categories);
  const matchingCategory = findCategoryBySlug(categories, categorySlug);
  // eslint-disable-next-line no-underscore-dangle
  let subCategories = await getSubCategories(matchingCategory?._id);

  subCategories = addSlugToSubCategories(subCategories);

  const matchingSubCategory = findSubCategoryBySlug(subCategories, subCategorySlug);

  const notifications = await getNotifications(matchingSubCategory?._id);

  // Exclude from subCategories the one that is currently being displayed
  const otherSubCategories = subCategories.filter(
    (subCategory) => subCategory.slug !== subCategorySlug
  );

  return (
    <div className="container safe-paddings relative pt-20">
      <div className="absolute -left-[600px] top-[-100px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
      <div className="absolute -right-[200px] top-[300px] h-[383px] w-[404px] bg-warm-gradient opacity-30 blur-[97px]" />
      {children}
      <div className="mb-40">
        <h2 className="mb-14 text-center text-4xl md:text-3xl">
          Other notification types for Social Media
        </h2>
        <div className="grid grid-cols-4 gap-x-16 gap-y-5 md:grid-cols-2 sm:grid-cols-1">
          {otherSubCategories.map((subCategory, index) => (
            <Link theme="purple" key={index} to={`/${matchingCategory.slug}/${subCategory.slug}/0`}>
              {subCategory.subCategory}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryLayout;

export const revalidate = 60;
