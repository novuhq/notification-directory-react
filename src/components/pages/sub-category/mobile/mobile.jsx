'use client';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import CardSvg from './card.inline.svg';
import CloseSvg from './close.inline.svg';

const Mobile = ({ notification }) => {
  const [currentDate, setCurrentDate] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);

  const truncatedMessage = (msg) => (msg.length > 60 ? `${msg.slice(0, 60)}...` : msg);

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
      <div className="lg:-translate-y-10">
        <img
          src="/images/mobile.svg"
          loading="eager"
          className="translate absolute top-[40px] bottom-0 left-1/2 -translate-x-1/2"
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
                    key={notification.id}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                  >
                    <CardSvg className="-m-[6px]" />
                    <div className="absolute top-1 left-0 right-0 p-3">
                      <div className="flex">
                        <div className="h-11 w-11 overflow-hidden rounded-full shadow-2xl">
                          <img src={notification.image} />
                        </div>
                        <div className="ml-[10px]">
                          <div className="flex items-center">
                            <div className="mr-3 text-[14px]">{notification.sender}</div>
                            <div className="mt-[4px] text-[10px] text-white/50">1 second ago</div>
                          </div>
                          <div className="w-[230px] text-[15px]">
                            {truncatedMessage(notification.msg)}
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
