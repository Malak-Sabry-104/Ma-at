import DestinationList from "../Components/DestinationList";
import Hero from "../Components/Hero";
import Layout from "../Components/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <DestinationList />
      </Layout>
    </>
  );
};

export default Home;
