import slugify from 'slugify';

import Link from 'components/shared/link';
import { getCategories, getSubCategories } from 'utils/api/queries';

const CategoryPage = async ({ params: { 'category-slug': categorySlug } }) => {
  const categories = await getCategories();
  categories.forEach((category, index) => {
    categories[index].slug = slugify(category.category, { lower: true });
  });

  const matchingCategory = categories.find((category) => category.slug === categorySlug);
  // eslint-disable-next-line no-underscore-dangle

  const subCategories = await getSubCategories(matchingCategory._id);

  subCategories.forEach((subCategory, index) => {
    subCategories[index].slug = slugify(subCategory.subCategory, { lower: true });
  });

  return (
    <div className="container safe-paddings mt-20">
      <div className="mb-6 lg:mb-2">
        <Link to="/" theme="purple">
          List of all categories
        </Link>
      </div>
      <div className="mb-14 max-w-[500px]">
        <h1 className="mb-4 text-4xl">{matchingCategory.category}</h1>
      </div>
      <div className="mb-40">
        <div className="grid grid-cols-4 gap-x-16 gap-y-5 md:grid-cols-2 sm:grid-cols-1">
          {subCategories.length > 0 &&
            subCategories.map((subCategory, index) => (
              <Link
                theme="purple"
                key={index}
                to={`/${matchingCategory.slug}/${subCategory.slug}/0`}
              >
                {subCategory.subCategory}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();

  categories.forEach((category, index) => {
    categories[index].slug = slugify(category.category, { lower: true });
  });

  console.log(categories);
  return categories.map((category) => ({
    'category-slug': category.slug,
  }));
}
