module.exports = {
  apps : [{
    name: 'book-management',
    script: 'server.js',
    env: {
      PORT: 3000,
      DATABASE_URL: "mysql://root:@localhost:3306/book_management"
    }
  }]
};
