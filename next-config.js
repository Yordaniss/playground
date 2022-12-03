module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/posts",
        destination: "https://playground-l9aacxvzj-yordaniss.vercel.app/",
      },
    ];
  },
};
