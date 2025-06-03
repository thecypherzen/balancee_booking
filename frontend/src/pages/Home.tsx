import ContentWrapper from "@/components/ContentWrapper";
import Filters from "@/components/Filters";
import ServiceStations from "@/components/ServiceStations";

const Home = () => {
  return (
    <>
      <section className="py-6">
        <ContentWrapper>
          <section
            data-role="heading"
            className="mb-10 flex flex-col items-center justify-center mt-10 text-center"
          >
            <h2 className="font-[900] text-xl mb-2 md:text-2xl lg:text-4xl lg:mb-3">
              Fix your vehicles with ease
            </h2>
            <p className="font-md text-primary/70">
              {" "}
              select your service below
            </p>
          </section>
        </ContentWrapper>
        <section data-role="filters" className="relative">
          <ContentWrapper>
            <Filters className="mb-10 mt-5" />
          </ContentWrapper>
        </section>
        <aside data-role="message" className="relative"></aside>
        <ContentWrapper>
          <ServiceStations />
        </ContentWrapper>
      </section>
    </>
  );
};

export default Home;
