import ContentWrapper from "@/components/ContentWrapper";
import Filters from "@/components/Filters";

const Home = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-start py-6">
        <section
          data-role="heading"
          className="mb-10 flex flex-col items-center justify-center mt-10"
        >
          <h2 className="font-[900] text-2xl lg:text-4xl lg:mb-3">
            Fix your vehicles with ease
          </h2>
          <p className="font-md text-primary/70"> select your service below</p>
        </section>
        <section data-role="filters" className="relative">
          <ContentWrapper>
            <Filters />
          </ContentWrapper>
        </section>
        <section data-role="search results"></section>
        <aside data-role="message" className="relative"></aside>
      </section>
    </>
  );
};

export default Home;
