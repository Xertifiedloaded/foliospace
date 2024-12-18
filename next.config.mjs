/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: {
          sizeLimit: '50mb', // Adjust to 50mb
        },
      },
  };
  
  export default nextConfig;
  