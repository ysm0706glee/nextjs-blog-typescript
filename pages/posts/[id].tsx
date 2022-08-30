import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { Post } from "../../types/post";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";

type Props = { postData: Post };

const Post: NextPage<Props> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<Pick<Post, "id">> = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
