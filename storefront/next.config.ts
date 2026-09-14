import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Keep the WooCommerce URLs alive after the migration.
      { source: "/product/:slug", destination: "/produse/:slug", permanent: true },
      {
        source: "/product-category/:slug",
        destination: "/produse?domeniu=:slug",
        permanent: true,
      },
      { source: "/shop", destination: "/produse", permanent: true },
    ];
  },
};

export default nextConfig;
