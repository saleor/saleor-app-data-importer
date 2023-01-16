/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   transpilePackages: ['nuvo-react']
// };


const withTM = require('next-transpile-modules')([
  'nuvo-react',
])

module.exports = withTM({
  reactStrictMode: true,
  experimental:{
    esmExternals: true
  }
});
