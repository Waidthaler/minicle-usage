const ac = require("ansi-colors");

//==============================================================================
// Outputs the runtime header to console. This will become progressively more
// ostentatious and ridiculous as time goes by. The options object may contain:
//
//     lineChar .... A single character used for the borders. Defaults to "=".
//     width ....... The width of the header in characters. Defaults to 76.
//     useColors ... A boolean indicating whether to use ANSI colors. Defaults
//                   to true.
//==============================================================================

function header(content, options) {

    if(options === undefined)
        options = { };

    if(options.lineChar === undefined)
        options.lineChar = "=";
    if(options.width === undefined)
        options.width = 76;
    if(options.useColors === undefined)
        options.useColors = true;

    var line    = options.lineChar.repeat(options.width);
    var title   = " ".repeat(Math.round(((options.width - 2) / 2) - (content.length / 2))) + content;
    title += " ".repeat(options.width - 4 - title.length);

    var header = "\n" + ac.blue(line) + "\n"
        + ac.blue(options.lineChar + " ") + ac.yellow.bold(title) + ac.blue(" " + options.lineChar) + "\n"
        + ac.blue(line) + "\n";

    if(!options.useColors)
        header = ac.unstyle(header);

    console.log(header);

}


//==============================================================================
// Outputs usage instructions. Takes an extended minicle optionMap (see README)
// and an options object. The options object may contain:
//
//     exit .......... If true, exit the program after output. Defaults to true.
//     subcommands ... Defaults false, must be true if the option map includes
//                     git-style subcommands.
//     usageText ..... Whatever text should follow "Usage: ".
//     width ......... Maximum width of output, defaults to 76. Note that this
//                     is advisory: content does not wrap.
//     useColors ..... Whether to use ANSI colors. Defaults to true.
//     lineChar ...... Separator between commands, defaults to "-"
//
//
//==============================================================================

function usage(optionMap, options) {

    if(options === undefined)
        options = { };

    if(options.exit === undefined)
        options.exit = true;

    if(options.subcommand !== undefined)
        options.subcommands = options.subcommand;

    if(options.subcommands === undefined)
        options.subcommands = false;


    if(options.usageText === undefined)
        options.usageText = "YOU FORGOT TO SPECIFY options.usageText!";
    if(options.width === undefined)
        options.width = 76;
    if(options.useColors === undefined)
        options.useColors = true;
    if(options.lineChar === undefined)
        options.lineChar = "-";


    var content = [ ];
    content.push(ac.white.bold("  Usage: " + options.usageText));

    // Calculate column widths -------------------------------------------------

    var max = { long: 0, args: 0, desc: 0 };
    if(options.subcommands) {
        for(var cmd in optionMap) {
            getWidths(optionMap[cmd], max);
        }
    } else {
        getWidths(optionMap, max);
    }

    var minWidth = 10 + max.long + max.args + max.desc;
    var pad = 1;
    if(minWidth < options.width)
        pad = Math.floor((options.width - minWidth) / 2);
    if(pad < 1)
        pad = 1;

    // Assemble the output lines -----------------------------------------------

    if(options.subcommands) {
        for(var cmd in optionMap) {
            if(cmd == "@all")
                var separator = " (all commands) ";
            else if(cmd == "@none")
                var separator = " (no command) ";
            else if(cmd == "@general" || cmd == "@subcommand")
                continue;
            else
                var separator = " cmd: " + cmd + " ";
            separator += options.lineChar.repeat(options.width - separator.length);
            content.push(ac.green.bold("\n" + separator + "\n"));
            for(var longOpt in optionMap[cmd]) {
                if(longOpt.substr(0, 1) == "@")
                    continue;
                content.push(formatOption(longOpt, optionMap[cmd][longOpt], max, pad));
            }
        }
    } else {
        content.push("");
        for(var longOpt in optionMap) {
            if(longOpt.substr(0, 1) == "@")
                continue;
            content.push(formatOption(longOpt, optionMap[longOpt], max, pad));
        }
    }

    content = content.join("\n") + "\n";
    if(!options.useColors)
        content = ac.unstyle(content);
    console.log(content);

    if(options.exit)
        process.exit(0);
}


//------------------------------------------------------------------------------
// Takes a long option, its corresponding optionMap value, the max object, and a
// pad value, and returns a formatted version.
//------------------------------------------------------------------------------

function formatOption(longOpt, map, max, pad) {
    longOpt += " ".repeat((max.long - longOpt.length) + pad);
    var args = map.args === undefined ? "" : map.args;
    args +=  " ".repeat((max.args - args.length) + pad);
    var desc = map.desc === undefined ? "" : map.desc;

    if(map.short === undefined)
        return ac.yellow.bold("    --" + longOpt + "    ")
            + ac.blue.bold(args) + ac.cyan.bold(desc);
    else
        return ac.yellow.bold("    -" + map.short + ", --" + longOpt)
            + ac.blue.bold(args) + ac.cyan.bold(desc);
}


//------------------------------------------------------------------------------
// Given a whole map or a subcommand map and an object (see def. of max above),
// finds max lengths for each element.
//------------------------------------------------------------------------------

function getWidths(map, max) {
    for(var longOpt in map) {

        var args = map[longOpt].args ? map[longOpt].args : "";
        var desc = map[longOpt].desc ? map[longOpt].desc : "";

        if(longOpt.length > max.long)
            max.long = longOpt.length;
        if(args.length > max.args)
            max.args = args.length;
        if(desc.length > max.desc)
            max.desc = desc.length;
    }
}


module.exports = {
    header: header,
    usage:  usage
};

