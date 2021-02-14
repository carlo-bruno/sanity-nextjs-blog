import Head from 'next/head';
import homeStyles from '../styles/Home.module.scss';
import imageUrlBuilder from '@sanity/image-url';
import { Toolbar } from '../components/toolbar';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'osrl6g2h',
        dataset: 'production',
      });

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder
              .image(p.mainImage)
              .width(500)
              .height(250),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  const displayPosts = mappedPosts.map((p, i) => {
    const {
      slug: { current },
      title,
      mainImage,
    } = p;

    return (
      <div
        key={i}
        className={homeStyles.post}
        onClick={() => router.push(`/post/${current}`)}>
        <h3>{title}</h3>
        <img
          className={homeStyles.mainImage}
          src={mainImage}
          alt={title}
        />
      </div>
    );
  });

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Toolbar />
      <main className={homeStyles.main}>
        <h1 className={homeStyles.title}>Next.js Ｘ Sanity.io</h1>

        <h3>Articles:</h3>
        <div className={homeStyles.feed}>
          {displayPosts || <>No Posts Yet</>}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[_type == "post"]');
  const url = `https://osrl6g2h.api.sanity.io/v1/data/query/production?query=${query}`;
  const res = await fetch(url).then((res) => res.json());

  console.log('RES', res);

  if (!res.result || !res.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: res.result,
      },
    };
  }
};
