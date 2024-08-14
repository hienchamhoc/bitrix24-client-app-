/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        INTRANET_DOMAIN:'https://b24-4r1n5i.bitrix24.vn/',
        HANDLE_DOMAIN:'https://bx-oauth2.aasc.com.vn/',
        APP_ID:'local.66baacce8f4d49.77053557'
    },
    async rewrites(){
        return [
            {
              source: '/',
              destination: 'https://bx-oauth2.aasc.com.vn/bx/oauth2_token/:path*',
            },
          ]
    }
};

export default nextConfig;
