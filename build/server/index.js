"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Note_1 = require("./entities/Note");
const main = async () => {
    const app = (0, express_1.default)();
    await (0, typeorm_1.createConnection)({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "1234",
        database: "test123",
        entities: [Note_1.Note],
        synchronize: true,
        logging: false,
    });
    app.get("/", (_req, res) => {
        res.send("Hello");
    });
    app.listen(3000);
};
main();
//# sourceMappingURL=index.js.map