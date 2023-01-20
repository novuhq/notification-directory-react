import PropTypes from 'prop-types';
import React from 'react';
import slugify from 'slugify';

import Link from 'components/shared/link';
import ArrowIcon from 'images/arrow.inline.svg';
import AirplaneIcon from 'images/cards/airplane.inline.svg';
// const icons = {
//   airplane: AirplaneIcon,
//   cart: CartIcon,
//   person: PersonIcon,
//   shop: ShopIcon,
// };

const CategoryCard = ({ title, description, subCategories, categoryId }, index) => (
  // const Icon = icons[iconName];
  // console.log('aaaaa');
  <li className="flex h-full flex-col bg-white/[0.04] p-6 text-left backdrop-blur-xl" key={index}>
    <div className="border-b border-dashed border-purple border-opacity-20 pb-6">
      <div className="flex align-middle">
        <div className="mr-3.5 ">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-3">
            <AirplaneIcon className="z-10 h-5 w-5" />
          </div>
        </div>
        <h3 className="text-xl font-medium leading-snug text-white">{title}</h3>
      </div>
      <p className="font-book text-gray-11 mt-3 leading-normal">{description}</p>
    </div>
    <ul className="mt-6 flex-grow">
      {subCategories &&
        subCategories.length > 0 &&
        subCategories.slice(0, 5).map((item, index) => (
          <li className="mt-2 text-base leading-normal first:mt-0" key={index}>
            <Link
              theme="purple"
              to={`/${slugify(title, { lower: true })}/${slugify(item.subCategory, {
                lower: true,
              })}`}
            >
              {item.subCategory}
            </Link>
          </li>
        ))}
    </ul>
    <Link
      className="mt-auto mt-7 flex align-middle text-sm font-medium uppercase text-white"
      to={`${slugify(title, { lower: true })}`}
    >
      show more <ArrowIcon className="my-auto ml-2 h-2.5 w-3.5 text-white" />
    </Link>
  </li>
);
CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CategoryCard;
