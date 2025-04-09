"use strict";

hexo.on("generateBefore", () => {
    require("./lib/utils")(hexo);
});

const path = require('path');

const cdn = {
    jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
    friends: "https://raw.zako.uk/assets/data_services/friends.js",
}

hexo.extend.tag.register("friends", require("./lib/scripts/friends")(hexo));

hexo.extend.filter.register("theme_inject", function (injects) {
    injects.style.push(path.join(__dirname, "lib/next-tag-plugins.styl"));
    injects.bodyEnd.raw('jquery-js', `<script defer src="${cdn.jquery}"></script>`, {}, {cache: true});
    injects.bodyEnd.raw('data_services-friends-js', `<script defer src="${cdn.friends}"></script>`, {}, {cache: true});
});