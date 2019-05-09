#!/usr/bin/env node

var optionMap = {
    chain: {
        "infile":   { short: "i", vals: [ ] },
        "count":    { short: "c", vals: [ ], max: 1 },
        "start":    { short: "s", vals: [ ], max: 1 },
        "max-size": { short: "m", vals: [ ], max: 1 },
    },
    grammar: {
        "grammar":  { short: "g", vals: [ ] },
        "text":     { short: "t", vals: [ ] },
        "tokens":   { short: "T", vals: [ ], max: 1 },
        "iter":     { short: "i", vals: [ ], max: 1 },
    },
    babble: {
        "infile":   { short: "i", vals: [ ] },
        "count":    { short: "c", vals: [ ] },
    },
    "@all": {
        debug:      { short: "d", cnt: 0 },
        help:       { short: "h", cnt: 0 },
        quiet:      { short: "q", cnt: 0 },
        verbose:    { short: "v", cnt: 0 },
    },
    "@none": {
        help:       { short: "h", cnt: 0 },
    },

};

mu = require("./index.js");

mu.header("Default!");
mu.header("Without colors!", { useColors: false });
mu.header("Wide screen!", { width: 120 });
mu.header("Hashes!", { lineChar: "#" });
mu.header("B/W Hashes!", { lineChar: "#", useColors: false });

mu.usage(optionMap.chain, { usageText: "someprog <cmd> [options]", exit: false });
mu.usage(optionMap, { usageText: "someprog <cmd> [options]", subcommands: true, exit: false });

/*

options.subcommand

//==============================================================================
// Outputs usage instructions.
//==============================================================================

function usage(exit = true) {

    console.log(ac.white.bold("  Usage: textrix <cmd> [options]\n\n")
        + ac.green.bold(" cmd: chain ---------------------------------------------------------------\n\n")
        + ac.yellow.bold("    -i") + ac.yellow(", ") + ac.yellow.bold("--infile        ") + ac.blue.bold("<filename(s)>  ") + ac.cyan.bold("Path to input chain file(s).\n")
        + ac.yellow.bold("    -c") + ac.yellow(", ") + ac.yellow.bold("--count         ") + ac.blue.bold("<number>       ") + ac.cyan.bold("Number of chains to generate.\n")
        + ac.yellow.bold("    -s") + ac.yellow(", ") + ac.yellow.bold("--start         ") + ac.blue.bold("<string>       ") + ac.cyan.bold("Start tag for chain.\n")
        + ac.yellow.bold("    -m") + ac.yellow(", ") + ac.yellow.bold("--max-size      ") + ac.blue.bold("<number>       ") + ac.cyan.bold("Maximum links per chain.\n\n")
        + ac.green.bold(" cmd: grammar -------------------------------------------------------------\n\n")
        + ac.yellow.bold("    -g") + ac.yellow(", ") + ac.yellow.bold("--grammar       ") + ac.blue.bold("<filename(s)>  ") + ac.cyan.bold("Path to grammar file(s).\n")
        + ac.yellow.bold("    -t") + ac.yellow(", ") + ac.yellow.bold("--text          ") + ac.blue.bold("<filename>     ") + ac.cyan.bold("Path to template text.\n")
        + ac.yellow.bold("    -T") + ac.yellow(", ") + ac.yellow.bold("--tokens        ") + ac.blue.bold("<number>       ") + ac.cyan.bold("Maximum number of tokens.\n")
        + ac.yellow.bold("    -i") + ac.yellow(", ") + ac.yellow.bold("--iter          ") + ac.blue.bold("<number>       ") + ac.cyan.bold("Maximum number of iterations.\n\n")
        + ac.green.bold(" cmd: babble --------------------------------------------------------------\n\n")
        + ac.yellow.bold("    -i") + ac.yellow(", ") + ac.yellow.bold("--infile        ") + ac.blue.bold("<file/name/wt> ") + ac.cyan.bold("Input file, name, and weight.\n")
        + ac.yellow.bold("    -c") + ac.yellow(", ") + ac.yellow.bold("--count         ") + ac.blue.bold("<number>       ") + ac.cyan.bold("Number of sentences to generate.\n\n")
        + ac.green.bold(" General options-----------------------------------------------------------\n\n")
        + ac.yellow.bold("    -v") + ac.yellow(", ") + ac.yellow.bold("--verbose       ") + ac.blue.bold("               ") + ac.cyan.bold("Increase verbosity (1-4).\n")
        + ac.yellow.bold("    -q") + ac.yellow(", ") + ac.yellow.bold("--quiet         ") + ac.blue.bold("               ") + ac.cyan.bold("Suppress console output.\n")
        + ac.yellow.bold("    -d") + ac.yellow(", ") + ac.yellow.bold("--debug         ") + ac.blue.bold("               ") + ac.cyan.bold("Display debugging info.\n")
        + ac.yellow.bold("    -h") + ac.yellow(", ") + ac.yellow.bold("--help          ") + ac.blue.bold("               ") + ac.cyan.bold("Display this text.\n\n"));

    if(exit)
        process.exit(0);
}

*/
