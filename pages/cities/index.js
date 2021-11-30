import Container from "../../components/container";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import { getAllCitiesWithSlug } from "../../lib/graphcms";
import Head from "next/head";
import Link from "next/link";
import { CMS_NAME } from "../../lib/constants";

export default function Index({ cities, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <h1>Nos villes</h1>
          <lu>
            {cities &&
              cities.map((city) => (
                <li>
                  <Link href={`/cities/${city.slug}`} key={city.slug}>
                    <a className="hover:underline">{city.title}</a>
                  </Link>
                </li>
              ))}
          </lu>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const cities = (await getAllCitiesWithSlug(preview)) || [];

  return {
    props: { cities, preview },
  };
}
