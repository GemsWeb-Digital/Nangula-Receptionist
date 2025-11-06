/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gemsweb.xyz',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
