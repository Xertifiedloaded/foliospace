/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
      bodyParser: {
        sizeLimit: '20mb', // Set the size limit for the body parser to 20MB
        timeout: 60000,
      },
    },
  };
  
  export default nextConfig;
  