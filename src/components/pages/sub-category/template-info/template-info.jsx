'use client';

import { useState } from 'react';

import Mobile from 'components/pages/sub-category/mobile';
import Button from 'components/shared/button';
import Link from 'components/shared/link';
import LINKS from 'constants/links';

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

const notificationTemp =
  'est rerum tempore {{vitae}} sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut {{reiciendis}} qui aperiam non debitis possimus qui neque nisi nulla';

// function that will accept  notificationTemp string and replace items in {{}} with span tags containing the variable name and that uses style color from a colors variables based on the index of the variable in the variables array
const parseNotification = (notification) => {
  let enhancedNotification = notification;
  const regex = /{{(.*?)}}/g;
  const matches = notification.match(regex);
  matches.forEach((match, index) => {
    enhancedNotification = enhancedNotification.replace(
      match,
      `<span style="color: ${colors[index]}">${match}</span>`
    );
  });
  return enhancedNotification;
};

const notification = {
  id: '5f9f1b9b0b1b9c0017b0b1b1',
  msg: notificationTemp,
  image: 'https://picsum.photos/200',
  sender: 'Roger',
};

const generateNewNotification = (notification) => {
  const newNotification = { ...notification };
  newNotification.id = Math.random().toString(36).substr(2, 9);
  console.log();
  return newNotification;
};
const TemplateInfo = ({ matchingCategory, matchingSubCategory }) => {
  const [currentNotification, setCurrentNotification] = useState(notification);

  const sendTestNotification = () => {
    const newNotification = generateNewNotification(currentNotification);
    setCurrentNotification(newNotification);
  };

  return (
    <div className="relative z-10 mb-56 grid grid-cols-6 gap-x-[30px] md:mb-16 md:grid-cols-none">
      <div className="col-span-3">
        <div className="mb-6 lg:mb-2">
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
        <div
          className="mb-10 bg-white/[0.08] px-4 py-3 backdrop-blur-xl"
          dangerouslySetInnerHTML={{ __html: parseNotification(notificationTemp) }}
        />
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
        <div className="flex space-x-5 md:mb-10">
          <Button
            size="sm"
            theme="purple-filled"
            onClick={() => {
              sendTestNotification();
            }}
          >
            Send a test notification
          </Button>
          <Button to={LINKS.novu.to} size="sm" theme="gray-filled">
            Try it on Novu
          </Button>
        </div>
      </div>
      <div className="col-span-3">
        <Mobile notification={currentNotification} />
      </div>
    </div>
  );
};

export default TemplateInfo;
