const express = require("express");
const userService = require("../Script/UserService");
const jwtService = require('../Script/jwtService');

const router = express.Router({
    mergeParams: true
});
router.get("/", async (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.get("/login", (req, res) => {
    try {
        if (req.user) {
            return res.redirect("/");
        }
        res.render("login", {
            msg: req.query.msg
        });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.get("/signup", (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.post("/signup", async (req, res) => {
    try {
        if (await userService.GetUserByEmail(req.body.email)) {
            return res.redirect("/login?msg=Email already in use.");
        }
        await userService.SaveUser(req.body.name, req.body.email, req.body.password);
        res.redirect("/login?msg=Account created successfully");
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.post("/login", async (req, res) => {
    try {
        let user = await userService.AuthUser(req.body.email, req.body.password);
        if (user) {
            let token = jwtService.generateToken(user.email);
            res.cookie("token", token);
            res.redirect("/");
        } else {
            res.redirect("/login?msg=Wrong username or password");

        }
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
module.exports = router;