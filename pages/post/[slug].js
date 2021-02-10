import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import postStyles from '../../styles/Post.module.scss';

export const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: 'osrl6g2h',
      dataset: 'production',
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <div>
      <div className={postStyles.main}>
        <h2>{title}</h2>

        {imageUrl && (
          <img className={postStyles.mainImage} src={imageUrl} />
        )}

        <div className={postStyles.body}>
          <BlockContent blocks={body} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

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
