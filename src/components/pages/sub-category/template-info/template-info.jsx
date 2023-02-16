'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Mobile from 'components/pages/sub-category/mobile';
import Button from 'components/shared/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/shared/dialogue';
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
// function that will accept  notificationTemp string and replace items in {{}} with span tags containing the variable name and that uses style color from a colors variables based on the index of the variable in the variables array
const parseNotification = (notification) => {
  let enhancedNotification = notification;
  const regex = /{{(.*?)}}/g;
  const matches = notification.match(regex);

  matches?.forEach((match, index) => {
    enhancedNotification = enhancedNotification.replace(
      match,
      `<span style="color: ${colors[index]}">${match}</span>`
    );
  });
  return enhancedNotification;
};

// // function that will accept  notificationTemp string and find variables inside {{}} and return an array of objects with the variable name, without the {{}}

const findVariables = (notification) => {
  const regex = /{{(.*?)}}/g;
  const matches = notification.match(regex);

  return matches?.map((match) => match.replace(/{{|}}/g, ''));
};

const InputGroup = ({ variable, formik }) => (
  <div className="grid w-full items-center gap-1.5">
    <label>{variable}</label>
    <input
      name={variable}
      type="text"
      value={formik.values[variable] || ''}
      className="placeholder:text-slate-400 focus:ring-slate-400 flex h-10 w-full rounded-md border border-purple-1/20 bg-black/20 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-1 "
      onChange={formik.handleChange}
    />
  </div>
);

const TemplateInfo = ({
  matchingCategory,
  matchingSubCategory,
  notifications,
  currentNotificationIndex,
}) => {
  const [open, setOpen] = useState(false);
  const [customNotification, setCustomNotification] = useState(undefined);

  const pathname = usePathname();
  const prevPath = pathname.split('/').slice(0, -1).join('/');

  const notification = notifications[currentNotificationIndex];
  // Calculate index of the next notification, if it's the last notification, go back to the first one
  const nextNotificationIndex =
    currentNotificationIndex === notifications.length - 1 ? 0 : currentNotificationIndex + 1;
  // Calculate index of the previous notification, if it's the first notification, go to the last one

  const previousNotificationIndex =
    currentNotificationIndex === 0 ? notifications.length - 1 : currentNotificationIndex - 1;

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      setOpen(false);
      // clone the notification object
      const customNotificationTemp = { ...notification };
      // generate random _id for the notification
      customNotificationTemp._id = Math.random().toString(36).substr(2, 9);
      customNotificationTemp.notification = notification.notification.replace(
        /{{(.*?)}}/g,
        (match) => values[match.replace(/{{|}}/g, '')]
      );

      setCustomNotification(customNotificationTemp);
    },
  });

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
        <div className="mb-4 flex justify-between gap-4">
          <div>
            Notification {currentNotificationIndex + 1} of {notifications.length}
          </div>
          <div className="hidden gap-4 sm:flex">
            <NextLink href={`${prevPath}/${previousNotificationIndex}`} className="hidden sm:block">
              {'<'} Previous
            </NextLink>
            <NextLink href={`${prevPath}/${nextNotificationIndex}`} className="hidden sm:block">
              Next {'>'}
            </NextLink>
          </div>
        </div>
        <div
          className="mb-10 bg-white/[0.08] px-4 py-3 backdrop-blur-xl"
          dangerouslySetInnerHTML={{ __html: parseNotification(notification.notification) }}
        />

        {/* <div className="mb-14">
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
        </div> */}

        <div className="flex space-x-5 md:mb-10">
          {findVariables(notification.notification) && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" theme="purple-filled">
                  Send a test notification
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Fill variables to test notification</DialogTitle>
                </DialogHeader>

                <form className="grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
                  vv
                  {findVariables(notification.notification).map((variable, index) => (
                    <InputGroup key={index} variable={variable} formik={formik} />
                  ))}
                  <div className="mt-4">
                    <Button size="sm" theme="purple-filled" type="submit">
                      Send a test notification
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <Button to={LINKS.novu.to} size="sm" theme="gray-filled">
            Go to Novu
          </Button>
        </div>
      </div>
      <div className="col-span-3">
        <Mobile
          notificationId={customNotification?._id || notification._id}
          notificationMsg={customNotification?.notification || notification.notification}
          nextNotificationIndex={nextNotificationIndex}
          previousNotificationIndex={previousNotificationIndex}
        />
      </div>
    </div>
  );
};

export default TemplateInfo;
