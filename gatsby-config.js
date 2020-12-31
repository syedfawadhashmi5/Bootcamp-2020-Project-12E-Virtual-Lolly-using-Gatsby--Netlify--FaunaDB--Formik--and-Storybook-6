module.exports = {
  siteMetadata: {
    title: "gatsby",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "",
      },
    },
    "gatsby-plugin-offline",
  ],
};
