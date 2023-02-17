import NextImage from 'next/image';

import Button from 'components/shared/button';
import CategoryCard from 'components/shared/category-card';
import ButtonLogo from 'images/chatgpt.inline.svg';
import { getCategoriesWithAllSubCategories } from 'utils';

const Home = async () => {
  const categories = await getCategoriesWithAllSubCategories();
  return (
    <>
      <section className="safe-paddings pt-28 pb-[328px] sm:pb-16">
        <div className="container relative">
          <div className="relative z-10">
            <h1 className="mt-2 max-w-[800px] text-[64px] font-medium leading-denser text-white lg:max-w-[500px] lg:text-5xl sm:max-w-none sm:text-center sm:text-4xl">
              Notification <span className="text-purple">inspirations</span> for your App made{' '}
              <br />
              with ChatGPT
            </h1>
            <p className="text-gray-11 mt-5 max-w-[488px] text-lg leading-normal sm:max-w-none sm:text-center">
              Discover an extensive library of customizable notifications for your users. Choose
              from various options to keep your audience engaged and informed. Focus on programming
              rather than creativity.
            </p>
            <div className="mt-11 flex sm:mt-6 sm:items-center sm:justify-center">
              <Button
                className="mr-6"
                to="/e-commerce/order-confirmation"
                theme="purple-filled"
                size="lg"
              >
                <ButtonLogo className="mr-2.5 h-5 w-5" />
                Show me
              </Button>
              <Button
                theme="gray-filled"
                to="https://novu.co/?utm=notificationsDirectory"
                size="lg"
              >
                Discover Novu
              </Button>
            </div>
          </div>
          <div className="absolute top-[-400px] right-[-590px] z-0 md:right-[-800px] sm:hidden">
            <NextImage src="/images/hero.jpeg" width="1371" height="1292" alt="Hero image" />
          </div>
        </div>
      </section>
      <section className="safe-paddings pt-30 relative  pb-40 ">
        <div className="container">
          <div className=" text-center">
            <h2 className="text-4xl leading-tight text-white sm:text-3xl">
              Discover the Power of Notifications
            </h2>
            <p className="font-book text-gray-11 mx-auto mt-4 max-w-[592px] text-lg leading-normal">
              Unlock the full potential of your notifications with our diverse category library.
              Discover the power of personalized notifications, focusing on code rather than copy.
            </p>
          </div>
          <ul className="relative z-10 mt-14 grid grid-cols-3 gap-x-8 gap-y-8 md:grid-cols-2 sm:grid-cols-1">
            {categories.map((category, index) => (
              <CategoryCard
                title={category.category}
                subCategories={category.subCategories}
                key={index}
              />
            ))}
          </ul>
          <div className="absolute left-[23%] top-[150px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
          <div className="absolute left-[73%] top-[1000px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
          <div className="absolute left-[-20%] top-[1500px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
          <div className="absolute left-[11%] top-[3500px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
          <div className="absolute left-[-10%] top-[5500px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
          <div className="absolute left-[56%] top-[6500px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
          <div className="absolute left-[73%] top-[7500px] h-[692px] w-[814px] bg-light-gradient opacity-20 blur-[97px]" />
        </div>
      </section>
    </>
  );
};

export default Home;

export const revalidate = 60;
