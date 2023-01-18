import slugify from 'slugify';

import Link from 'components/shared/link';

const getCategories = async () => {
  const categoriesResponse = await fetch('https://api.notifications.directory/categories/');
  const categories = await categoriesResponse.json();
  return categories;
};

const getSubCategories = async (categoryId) => {
  const subCategoriesResponse = await fetch(
    `https://api.notifications.directory/categories/${categoryId}/sub`
  );
  const subCategories = await subCategoriesResponse.json();
  return subCategories;
};

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
      <div className="mb-6">
        <Link to="/" theme="purple">
          List of all categories
        </Link>
      </div>
      <div className="mb-14 max-w-[500px]">
        <h1 className="mb-4 text-4xl">{matchingCategory.category}</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="mb-40">
        <div className="grid grid-cols-4 gap-x-16 gap-y-5">
          {/* {subCategories.lenght > 0 &&
            subCategories.map((subCategory, index) => (
              <Link theme="purple" key={index} to={`/${matchingCategory.slug}/${subCategory.slug}`}>
                {subCategory.subCategory}
              </Link>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

export const revalidate = 60;
