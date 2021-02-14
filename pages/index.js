import Head from 'next/head';
import { Toolbar } from '../components/toolbar';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Toolbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Next.js Ｘ Sanity.io</h1>
      </main>
    </div>
  );
}
