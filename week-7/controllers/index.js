const home = (req, res) => {
    const data = {
        layout: "layouts/main",
        req,
    };
    res.render("index", data);
}

module.exports = { home }