"use strict";
exports.__esModule = true;
var express_1 = require("express");
var notes_1 = require("../controllers/notes");
var router = express_1["default"].Router();
router.route("/").get(notes_1.getAllNotes).post(notes_1.addNote);
router.route("/:id")["delete"](notes_1.deleteNote).get(notes_1.getNote).put(notes_1.changeNote);
exports["default"] = router;
