const app = require("./app");

const port = process.env.PORT || 3001;

const start = () => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

start();
