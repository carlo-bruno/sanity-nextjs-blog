import React from 'react';

export const Post = ({ title, body, image }) => {
  console.log(title, body, image);
  return <div>This is a post</div>;
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  console.log(pageSlug);

  if (!pageSlug) return { notFound: true };

  const query = encodeURIComponent(
    `*[_type == "post" && slug.current == "${pageSlug}"]`
  );
  const url = `https://osrl6g2h.api.sanity.io/v1/data/query/production?query=${query}`;

  const res = await fetch(url).then((res) => res.json());
  const post = res.result[0];

  if (!post) {
    return { notFound: true };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};

export default Post;
