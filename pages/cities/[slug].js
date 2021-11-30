import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "components/container";
import PostBody from "components/post-body";
import MoreStories from "components/more-stories";
import Header from "components/header";
import PostHeader from "components/post-header";
import SectionSeparator from "components/section-separator";
import Layout from "components/layout";
import {
  getAllCitiesWithSlug,
  getCityBySlug,
  getAllPostsWithSlug,
  getPostAndMorePosts,
} from "lib/graphcms";
import PostTitle from "components/post-title";
import Head from "next/head";
import { CMS_NAME } from "lib/constants";

export default function City({ city, preview }) {
  const router = useRouter();

  if (!router.isFallback && !city?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {city.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>

              <PostTitle>{city.title}</PostTitle>

              <p>{city.description}</p>

              {/* <PostHeader
                title={city.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              /> */}
              {/* <PostBody content={post.content} /> */}
            </article>
            <SectionSeparator />
            {/* {moreCities.length > 0 && <MoreStories cities={moreCities} />} */}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  console.log(
    "🚀 ~ file: [slug].js ~ line 59 ~ getStaticProps ~ params",
    params
  );
  const data = await getCityBySlug(params.slug);
  console.log("🚀 ~ file: [slug].js ~ line 60 ~ getStaticProps ~ data", data);

  return {
    props: {
      preview,
      city: data.city,
    },
  };
}

export async function getStaticPaths() {
  const cities = await getAllCitiesWithSlug();
  return {
    paths: cities.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}
