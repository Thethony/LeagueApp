const express = require("express");
const router = express.Router({
    mergeParams: true
});
// routes to add profile
router.get("/addProfile", async (req, res) => {
    try {
        res.render("addProfile");
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Manage profile route
router.get("/manageProfiles", async (req, res) => {
    try {
        let profiles = await profileService.GetAllProfiles();
        res.render("manageProfiles", {
            profiles,
            msg: req.query.msg
        });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Update profile route
router.post("/profile", async (req, res) => {
    try {
        if (req.body.id) {
            await profileService.EditProfile(req.body.id, req.body.name, req.body.rank, req.body.wins, req.body.champion);
            res.redirect("/manageProfiles?msg=Profile Updated Successfully!");

        } else {
            await profileService.SaveProfile(req.body.name, req.body.rank, req.body.wins, req.body.champion);
            res.redirect("/manageProfiles?msg=Profile Saved Successfully!");

        }
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.get("/profile", async (req, res) => {
    try {
        let profiles = await profileService.GetAllProfiles();
        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Edit Route

router.get("/editProfile/:id", async (req, res) => {
    try {
        let profile = await profileService.GetProfile(req.params.id);
        res.render("editProfile", {
            profile
        });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Delete route

router.get("/deleteProfile/:id", async (req, res) => {
    try {
        await profileService.DeleteProfile(req.params.id);
        res.redirect("/manageProfiles?msg=Profile Deleted Successfully!");
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

module.exports = router;