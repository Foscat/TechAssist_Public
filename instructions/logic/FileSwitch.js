fileSwitch = (fileName ="",fileDescription = "") => {
    switch(fileDescription) {
        case "replace crossmember":
            fileName += "3125";
            break;
        case "rocker panel":
            fileName += "31038";
            break;
        case "torque rod replacement":
        case "tower bracket replacement":
            fileName += "32054";
            break;
        case "filling procedure":
        case "oil inspection":
            fileName += "35034";
            break;
        case "air leak inspection":
            fileName += "42073";
            break;
        case "change brakes":
            fileName += "42077"
            break;
        case "lever bearing removal":
            fileName += "46056";
            break;
        case "DEF pressure connection":
            fileName += "49040";
            break;
        case "DEF line ice expansion":
            fileName += "4937";
            break;
        case "powernet worksheet":
            fileName += "54278";
            break;
        case "install camera":
            fileName += "54291";
            break;
        case "telltale installation":
            fileName += "54299";
            break;
        case "refrigerator circut":
            fileName += "54301";
            break;
        case "relay light installation":
            fileName += "54302";
            break;
        case "ESC inspection":
        case "ESC repair":
            fileName += "54304";
            break;
        case "modify heated windsheild":
            fileName += "54307";
            break;
        case "program ECU":
            fileName += "54308";
            break;
        case "complexity harness installation":
            fileName += "54310";
            break;
        case "cabin drip shield":
            fileName += "54312";
            break;
        case "replace service jumper":
            fileName += "54313";
            break;
        case "marker light gasket old":
            fileName += "60158";
            break;
        case "mirror air leak":
            fileName += "60161";
            break;
        case "nosebeam water leak":
            fileName += "60162";
            break;
        case "add floor support":
            fileName += "60163";
            break;
        case "marker light gasket new":
            fileName += "60165";
            break;
        case "splash cover installation":
            fileName += "60165";
            break;
        case "install vortex generator":
            fileName += "72042";
            break;
        case "AC housing retrofit":
            fileName += "83160";
            break;
        default:
            fileName += "error"
    }
    return fileName;
}
module.exports = fileSwitch;