import { useRouter } from 'next/router';
import toolbarStyles from '../styles/Toolbar.module.scss';

export const Toolbar = () => {
  const router = useRouter();
  return (
    <div className={toolbarStyles.main}>
      <div onClick={() => router.push('/')}>Home</div>
      <div
        onClick={() =>
          (window.location.href = 'https://twitter.com')
        }>
        Twitter
      </div>
      <div
        onClick={() => (window.location.href = 'https://github.com')}>
        GitHub
      </div>
    </div>
  );
};
