angular.module("apl")
    .filter("aplFlag", function () {
        var flags = [
            {
                name: "Delhi Daredevils",
                image: "dd.jpg"
            }, {
                name: "Gujarat Lions",
                image: "gl.jpg"
            }, {
                name: "Kolkata Knight Riders",
                image: "kkr.jpg"
            }, {
                name: "Kings XI Punjab",
                image: "kxip.jpg"
            }, {
                name: "Mumbai Indians",
                image: "mi.jpg"
            }, {
                name: "Royal Challengers Bangalore",
                image: "rcb.jpg"
            }, {
                name: "Rising Pune Supergiants",
                image: "rps.jpg"
            }, {
                name: "Sunrisers Hyderabad",
                image: "srh.jpg"
            }, {
                name: "Chennai Super Kings",
                image: "csk.png"
            }, {
                name: "Rajasthan Royals",
                image: "rr.png"
            }
        ];
        return function (input) {
            var team = _.find(flags, function (item) {
                return item.name === input;
            });
            return team ? "assets/images/flags/" + team.image : "";
        }
    });