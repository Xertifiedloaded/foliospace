import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Unauthorized Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, you need to log in to view this page.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Log In
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Go Back to Home
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          If you believe this is an error, contact{" "}
          <a href="/support" className="text-red-600 hover:underline">
            support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers.referer || '';

  if (!referer.includes('/profile') && !referer.includes('/dashboard')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {}, 
  };
};

export default UnauthorizedPage;
