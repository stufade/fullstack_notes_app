"use strict";
exports.__esModule = true;
exports.__port__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV == "prod";
exports.__port__ = process.env.PORT || 3001;
