#!/usr/bin/env node

var optionMap = {
    chain: {
        "infile":   { short: "i", vals: [ ],         args: "<filename(s)>", desc: "Path to input chain file(s)."  },
        "count":    { short: "c", vals: [ ], max: 1, args: "<number>",      desc: "Number of chains to generate." },
        "start":    { short: "s", vals: [ ], max: 1, args: "<string>",      desc: "Start tag for chain."          },
        "max-size": { short: "m", vals: [ ], max: 1, args: "<number>",      desc: "Maximum links per chain."      },
    },
    grammar: {
        "grammar":  { short: "g", vals: [ ],         args: "<filename(s)>", desc: "Path to grammar file(s)."      },
        "text":     { short: "t", vals: [ ],         args: "<filename>",    desc: "Path to template text."        },
        "tokens":   { short: "T", vals: [ ], max: 1, args: "<number>",      desc: "Maximum number of tokens."     },
        "iter":     { short: "i", vals: [ ], max: 1, args: "<number>",      desc: "Maximum number of iterations." },
    },
    babble: {
        "infile":   { short: "i", vals: [ ], args: "<file/name/wt>", desc: "Input file, name, and weight."    },
        "count":    { short: "c", vals: [ ], args: "<number>",       desc: "Number of sentences to generate." },
    },
    "@all": {
        debug:      { short: "d", cnt: 0, desc: "Increase verbosity (1-4)." },
        help:       { short: "h", cnt: 0, desc: "Suppress console output."  },
        quiet:      { short: "q", cnt: 0, desc: "Display debugging info."   },
        verbose:    { short: "v", cnt: 0, desc: "Display this text."        },
    },
    "@none": {
        help:       { short: "h", cnt: 0, desc: "Something or other" },
    },

};

mu = require("./index.js");

mu.usage(optionMap.chain, { usageText: "someprog <cmd> [options]", exit: false });
mu.usage(optionMap, { usageText: "someprog <cmd> [options]", subcommands: true, exit: false });
mu.usage(optionMap, { usageText: "someprog <cmd> [options]", subcommands: true, exit: false, useColors: false });

mu.header("Default! Version 1.0!");
mu.header("Without colors!", { useColors: false });
mu.header("Wide screen!", { width: 120 });
mu.header("Hashes!", { lineChar: "#" });
mu.header("B/W Hashes!", { lineChar: "#", useColors: false });
mu.header("Custom boxes!", { lineChar: "+-+|+-+|" });
mu.header("Custom boxes!!", { lineChar: "+-+|+-+|" });
mu.header("Custom boxes!!", { lineChar: "pcdos1" });
mu.header("Custom boxes!!", { lineChar: "pcdos2" });

