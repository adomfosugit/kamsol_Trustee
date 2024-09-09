/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['node-appwrite'],
      },
      images:{
        remotePatterns:[
          {
            protocol: 'https',
            hostname: 'cloud.appwrite.io',
            port: '',
            pathname: '/v1/storage/buckets/**',
          },
        ]
      }
};

export default nextConfig;
