import App from "./app";
import InitDatabase from "./config/database";

const Server = new App();

InitDatabase();

Server.run();
