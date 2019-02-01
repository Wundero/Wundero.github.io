var normal = [];
var starred = [];
var leftx = false;

$.ajax({
    url: "config/normal.json", async: false, success: function (file) {
        normal = file
    }
});
$.ajax({
    url: "config/starred.json", async: false, success: function (file) {
        starred = file
    }
});

quer(starred, star);
quer(normal, norm);

function quer(array, htmlfunc) {
    array.forEach(function (url) {
        var url2 = url;
        if (!url.includes("api.github.com")) {
            url2 = "https://api.github.com/repos/" + url.slice("https://github.com/".length);
        }
        $.ajax({
            url: url2, success: function (result) {
                htmlfunc(result);
            }
        })
    });
}

function norm(result) {
    if(leftx) {
        left(result);
    } else {
        right(result);
    }
    leftx = !leftx;
}

function right(result) {
    var name = result.name;
    var url = result.html_url;
    var description = result.description;
    if(description == null) {
        description = "Check the project out on GitHub!";
    } else {
        description += "<br/>Check the project out on GitHub!";
    }
    insert("<div class=\"row justify-content-center no-gutters mb-5 mb-lg-0\">\n" +
        "            <div class=\"col-lg-6\">\n" +
        "                <img class=\"img-fluid\" src=\"img/demo-image-01.jpg\" alt=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-6 order-lg-first\">\n" +
        "                <div class=\"bg-black text-center h-100 project\">\n" +
        "                    <div class=\"d-flex h-100\">\n" +
        "                        <div class=\"project-text w-100 my-auto text-center text-lg-left\">\n" +
        "                            <a href='"+url+"'><h4 class=\"text-white\">"+name+"</h4></a>\n" +
        "                            <p class=\"mb-0 text-white-50\">"+description+"</p>\n" +
        "                            <hr class=\"d-none d-lg-block mb-0 ml-0\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>");
}

function left(result) {
    var name = result.name;
    var url = result.html_url;
    var description = result.description;
    if(description == null) {
        description = "Check the project out on GitHub!";
    } else {
        description += "<br/>Check the project out on GitHub!";
    }
    insert("<div class=\"row justify-content-center no-gutters mb-5 mb-lg-0\">\n" +
        "            <div class=\"col-lg-6\">\n" +
        "                <img class=\"img-fluid\" src=\"img/demo-image-02.jpg\" alt=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-6\">\n" +
        "                <div class=\"bg-black text-center h-100 project\">\n" +
        "                    <div class=\"d-flex h-100\">\n" +
        "                        <div class=\"project-text w-100 my-auto text-center text-lg-left\">\n" +
        "                            <a href='"+url+"'><h4 class=\"text-white\">"+name+"</h4></a>\n" +
        "                            <p class=\"mb-0 text-white-50\">"+description+"</p>\n" +
        "                            <hr class=\"d-none d-lg-block mb-0 ml-0\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>");
}

function star(result) {
    console.log("starred: "+result);
    var name = result.name;
    var url = result.html_url;
    var description = result.description;
    if(description == null) {
        description = "Check the project out on GitHub!";
    } else {
        description += "<br/>Check the project out on GitHub!";
    }
    insert("<div class=\"row align-items-center no-gutters mb-4 mb-lg-5\">\n" +
        "            <div class=\"col-xl-8 col-lg-7\">\n" +
        "                <img class=\"img-fluid mb-3 mb-lg-0\" src=\"img/bg-masthead.jpg\" alt=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"col-xl-4 col-lg-5\">\n" +
        "                <div class=\"featured-text text-center text-lg-left\">\n" +
        "                    <a href='"+url+"'><h4>"+name+"</h4></a>\n" +
        "                    <p class=\"text-black-50 mb-0\">"+description+"</p>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>");
}

function insert(html) {
    $("#projects > div").append(html)
}