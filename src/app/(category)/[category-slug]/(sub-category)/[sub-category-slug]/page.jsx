import slugify from 'slugify';

import Button from 'components/shared/button';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import {
  addSlugToCategories,
  addSlugToSubCategories,
  findCategoryBySlug,
  findSubCategoryBySlug,
} from 'utils';
import { getCategories, getSubCategories, getNotifications } from 'utils/api/queries';

const colors = ['rgba(255, 179, 204, 1)', 'rgba(255, 230, 179, 1)'];
const variables = [
  {
    name: '{{play_name}}',
    description: 'The name of the play',
  },
  {
    name: '{{theater_name}}',
    description: 'The name of the theater',
  },
];

const SubCategorySlug = async ({
  params: { 'category-slug': categorySlug, 'sub-category-slug': subCategorySlug },
}) => {
  let categories = await getCategories();
  categories = addSlugToCategories(categories);
  // console.log(categories);
  const matchingCategory = findCategoryBySlug(categories, categorySlug);
  // eslint-disable-next-line no-underscore-dangle
  let subCategories = await getSubCategories(matchingCategory._id);

  subCategories = addSlugToSubCategories(subCategories);

  const matchingSubCategory = findSubCategoryBySlug(subCategories, subCategorySlug);

  const notifications = await getNotifications(matchingSubCategory._id);

  // Exclude from subCategories the one that is currently being displayed
  const otherSubCategories = subCategories.filter(
    (subCategory) => subCategory.slug !== subCategorySlug
  );

  return (
    <div className="container safe-paddings mt-20">
      <div className="mb-56 grid grid-cols-2 gap-x-[30px]">
        <div className="">
          <div className="mb-6">
            <Link to="/" theme="purple">
              List of all categories
            </Link>
            <span className="mx-2 text-gray-5">/</span>
            <Link to={`/${matchingCategory.slug}`} theme="purple">
              {matchingCategory.category}
            </Link>
          </div>
          <div className="mb-14">
            <h1 className="mb-4 text-4xl">{matchingSubCategory.subCategory}</h1>
            <p>{matchingSubCategory.description}</p>
          </div>
          <div className="mb-10">Code Snippet</div>
          <div className="mb-14">
            <h3 className="mb-3 text-xl">Variables</h3>
            <ul className="border-b border-dashed border-purple-1/20">
              {variables.map(({ name, description }, index) => (
                <li
                  key={index}
                  className="flex border-t border-dashed border-purple-1/20 py-3 text-sm"
                >
                  <span style={{ color: colors[index] }} className="w-40">
                    {name}
                  </span>
                  <p className="pl-3">{description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-5">
            <Button size="sm" theme="purple-filled">
              Send a test notification
            </Button>
            <Button to={LINKS.novu.to} size="sm" theme="gray-filled">
              Try it on Novu
            </Button>
          </div>
        </div>
        <div>
          <div className=" relative bg-mobile-gradient pb-[100%]">
            <img
              src="/images/mobile.svg"
              loading="eager"
              className="translate absolute bottom-0 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </div>
      <div className="mb-40">
        <h2 className="mb-14 text-center text-4xl">Other notification types for Social Media</h2>
        <div className="grid grid-cols-4 gap-x-16 gap-y-5">
          {otherSubCategories.map((subCategory, index) => (
            <Link theme="purple" key={index} to={`/${matchingCategory.slug}/${subCategory.slug}`}>
              {subCategory.subCategory}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategorySlug;

export const revalidate = 60;
