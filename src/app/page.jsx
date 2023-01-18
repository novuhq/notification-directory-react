import slugify from 'slugify';

import Button from 'components/shared/button';
import CategoryCard from 'components/shared/category-card';
import Link from 'components/shared/link';
import ButtonLogo from 'images/chatgpt.inline.svg';
import { getCategoriesWithAllSubCategories } from 'utils';

const Home = async () => {
  const categories = await getCategoriesWithAllSubCategories();
  return (
    <div className="container safe-paddings">
      <section className="safe-paddings relative pt-28 pb-[328px]">
        <div className="container-lg">
          <h1 className="mt-2 max-w-[800px] text-[64px] font-medium leading-denser text-white">
            Notification <span className="text-purple">inspirations</span> for your App made <br />
            with ChatGPT
          </h1>
          <p className="text-gray-11 mt-5 max-w-[488px] text-lg leading-normal">
            Lorem ipsum dolor sit amet consectetur. Lectus tortor proin tristique et. Sem tincidunt
            libero sed neque.
          </p>
          <div className="mt-11 flex">
            <Button className="mr-6" to="/" theme="purple-filled" size="lg">
              <ButtonLogo className="mr-2.5 h-5 w-5" />
              Show me
            </Button>
            <Button theme="gray-filled" to="https://novu.co/" size="lg">
              Discover Novu
            </Button>
          </div>
        </div>
      </section>
      <section className="safe-paddings pt-30 relative  pb-40">
        <div className="container-lg text-center">
          <h2 className="text-4xl leading-tight text-white">Lorem ipsum dolor</h2>
          <p className="font-book text-gray-11 mx-auto mt-4 max-w-[592px] text-lg leading-normal">
            Lorem ipsum dolor sit amet consectetur. Lectus tortor proin tristique et. Sem tincidunt
            libero sed neque.
          </p>
          <ul className="relative z-10 mt-14 grid grid-cols-3 gap-x-8 gap-y-8">
            {categories.map((category, index) => (
              <CategoryCard
                title={category.category}
                description="blablabla"
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
    </div>
  );
};

export default Home;

export const revalidate = 60;
