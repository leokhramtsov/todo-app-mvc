import Controller from "./controller";
import Model from "./model";
import View from "./view";
import "./styles.css";

const app = new Controller(new Model(), new View());
app.init();
