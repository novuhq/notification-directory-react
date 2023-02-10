'use client';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ArrowLeft from './arrow-left.inline.svg';
import ArrowRight from './arrow-right.inline.svg';
import CardSvg from './card.inline.svg';
import CloseSvg from './close.inline.svg';

const Mobile = ({
  notificationId,
  notificationMsg,
  nextNotificationIndex,
  previousNotificationIndex,
}) => {
  const [currentDate, setCurrentDate] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  // get current path of the page
  const pathname = usePathname();

  const truncatedMessage = (msg) => (msg.length > 57 ? `${msg.slice(0, 57)}...` : msg);

  // if pathName has this pattern /e-commerce/order-confirmation/2 then we need to remove the last part
  // and get the pathName as /e-commerce/order-confirmation
  const prevPath = pathname.split('/').slice(0, -1).join('/');

  useEffect(() => {
    // assign to a variable current date in this format January 10, Tuesday
    const currentDate = new Date().toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    // assign to a variable current date in this format 14:51 without AM/PM

    const currentTime = new Date().toLocaleString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    setCurrentTime(currentTime);
    setCurrentDate(currentDate);
  }, []);
  return (
    <div className=" relative overflow-hidden bg-mobile-gradient pb-[100%] md:h-[500px] md:pb-0">
      <Link
        href={`${prevPath}/${previousNotificationIndex}`}
        className="absolute top-1/2 left-10 z-10 block -translate-y-1/2 lg:left-3  sm:hidden"
      >
        <ArrowLeft className="w-10" />
      </Link>
      <Link
        href={`${prevPath}/${nextNotificationIndex}`}
        className="absolute top-1/2 right-10 z-10 block -translate-y-1/2 lg:right-3 sm:hidden"
      >
        <ArrowRight className="w-10" />
      </Link>
      <div className="lg:-translate-y-10 sm:-mx-[45px]">
        <img
          src="/images/mobile.svg"
          loading="eager"
          className="translate absolute top-[40px] bottom-0 left-1/2 w-[478px] -translate-x-1/2"
        />
        <div className="absolute left-1/2 top-[80px] w-[362px] -translate-x-1/2">
          <div
            className={clsx('mt-20 mb-[2px] text-center text-[17px] leading-none', {
              invisible: !currentDate,
            })}
          >
            {currentDate || 'Friday 1, January'}
          </div>
          <div
            className={clsx(
              'mb-10 bg-text-gradient bg-clip-text text-center text-[86px] leading-none text-transparent',
              { invisible: !currentTime }
            )}
          >
            {currentTime || '00:00'}
          </div>
          <div>
            <div className="px-[22px]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[13px]">Notification Center</div>
                <CloseSvg className="h-3 w-3" />
              </div>
              <div className="relative">
                <AnimatePresence>
                  <motion.div
                    className="absolute left-0 right-0 "
                    key={notificationId}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                  >
                    <CardSvg className="-m-[6px]" />
                    <div className="absolute top-1 left-0 right-0 p-3">
                      <div className="flex">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-1 text-white shadow-2xl">
                          A
                        </div>
                        <div className="ml-[10px]">
                          <div className="flex items-center">
                            <div className="mr-3 text-[14px]">Acme.corp</div>
                            <div className="mt-[4px] text-[10px] text-white/50">1 second ago</div>
                          </div>
                          <div className="w-[240px] text-[14px]">
                            {truncatedMessage(notificationMsg)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 ml-[54px] text-[10px] text-white/50">slide to view</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
