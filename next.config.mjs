/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //pt a putea folosi URL-uri de pe unsplash in proiect
        remotePatterns: [
            { hostname: "images.unsplash.com" },
            { hostname: "lh3.googleusercontent.com" },
        ],
    },

    experimental: {
        //pt a putea folosi serveractions in proiect
        serverActions: true
    }
};

export default nextConfig;
