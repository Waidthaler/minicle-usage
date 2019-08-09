# minicle-usage 1.0.3

**An add-on for [minicle](https://www.npmjs.com/package/minicle) that generates 
headers and usage information, optionally with ANSI coloring.**

Minicle is a deliberately simple module in the spirit of Unix tool philosophy: 
do one thing and do it well. For that reason, and because things like headers
and usage output are much more idiosyncratic than POSIX-ish command line switches,
they were left out of minicle. To fill that gap, at least for developers who
share my idiosyncratic tastes, there is now **minicle-usage**.

Given the same `optionMap` object used by minicle with a couple of fields added,
minicle-usage can output usage information, optionally with fancy ANSI colors. It
can also produce a generic runtime header.

## Table of Contents

* [Basic Usage](#basic-usage)
* [usage()](#usage)
* [header()](#header)
* [Custom Colors](#custom)
* [License](#license)
* [Todo](#todo)
* [Changelog](#changelog)

<a name="basic-usage"></a>
## Basic Usage Example

(We assume here that you are already familiar with minicle. If not, read 
[those docs](https://www.npmjs.com/package/minicle) first.)

As noted in the intro, minicle-usage uses an extended version of the same data
structure minicle uses. So starting from the minicle version...

```javascript
var optionMap = {
    infile:     { short: "i", vals: [ ] },
    outfile:    { short: "s", vals: [ ], max: 1 },
    verbose:    { short: "v", cnt: 0 },
    "@general": { vals: [ ] }
};
```

...all you have to do is add `args` and `desc` attributes for the switch arguments
and descriptions, respectively:

```javascript
var mu = require("minicle-usage");

var optionMap = {
    infile:     { short: "i", vals: [ ], args: "<filename>", desc: "Input file." },
    outfile:    { short: "s", vals: [ ], max: 1, args: "<filename>", desc: "Output file." },
    verbose:    { short: "v", cnt: 0, desc: "Increase verbosity level." },
    "@general": { vals: [ ] }
};

mu.usage(optionMap, { usageText: "someprog <cmd> [options]" });
```

This will yield something like:

```
  Usage: someprog <cmd> [options]

   -i, --infile      <filename>       Input file.
   -o, --outfile     <filename>       Output file.
   -v, --verbose                      Increase verbosity level.

```

Note that the `@general` option is ignored, as would be `@subcommand`. Also note 
that both `args` and `desc` are both optional, though you'll nearly always want
to include `desc`.

To keep this example simple, subcommands are not shown, but they are fully supported.

The module exports an object with two functions, `usage`, which we just covered,
and the oh-so-trivial `header`, which just takes a string, centers it, and wraps it
in a box:

```javascript
mu.header("Default! Version 1.0!");
```

which outputs

```
============================================================================
=                            Default! Version 1.0!                         =
============================================================================
```

<a name="usage"></a>
## usage()

The `usage` function, as explained above, takes an expanded variant of the
minicle `optionMap`, with added `args` and `desc` attributes (both optional).
It takes two arguments:

```javascript
usage(optionMap, options)
```

The `options` argument may contain the following attributes:

* **`customColors`:** An object containing custom ANSI color callbacks. [See below.](#custom)
* **`exit`:** If true, exit the program after output. Defaults to `true`.
* **`lineChar`:** Separator between commands, defaults to `"-"`
* **`subcommand`:** Defaults `false`, must be `true` if minicle is using git-style subcommands.
* **`usageText`:** Whatever text should follow `Usage:`. Not strictly required, but defaults to `"YOU FORGOT TO SPECIFY options.usageText!"`.
* **`useColors`:** Whether to use ANSI colors. Defaults to `true`.
* **`width`:** Maximum width of output, defaults to 76. Note that this is advisory: content does not wrap.

<a name="header"></a>
## header()

The `header` function just emits a simple header centered in a box:

```javascript
header(content, options)
```

The `content` argument is the text in the box. The `options` argument may contain
the following attributes:

* **`customColors`:** An object containing custom ANSI color callbacks. [See below.](#custom)
* **`lineChar`:** By default, this is a single character, `"="` to use for drawing the box. If eight characters are supplied, they are used for the eight directions, starting from the upper left and proceeding clockwise. Alternatively, `"ascii"`, `"pcdos1"`, and `"pcdos2"` are shortcuts for a few common variations.
* **`useColors`:** A boolean indicating whether to use ANSI colors. Defaults to `true`.
* **`width`:** The width of the header in characters. Defaults to 76.

<a name="custom"></a>
## Custom Colors

Custom colors are supplied using the mysteriously named `customColors` option. 
This consists of an object containing callbacks to wrap strings in ANSI color 
codes, such as the functions in `ansi-colors` or `chalk`. There are five callbacks
required: `usage`, `switches`, `args`, `desc`, and `cmd`.

If you're using `ansi-colors`, assigned to `const ac`, this is what the 
`customColors` option would look like if you perversely insisted on duplicating 
the defaults:

```javascript
customColors: {
    usage:    ac.white.bold,
    switches: ac.yellow.bold,
    args:     ac.blue.bold,
    desc:     ac.cyan.bold,
    cmd:      ac.green.bold,
}
```

<a name="license"></a>
## License

Copyright 2019 Erich Waidthaler and subsequent contributors

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this 
list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, 
this list of conditions and the following disclaimer in the documentation and/or 
other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR 
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON 
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

<a name="todo"></a>
## Todo

* Solicit suggestions from users.

<a name="changelog"></a>
## Changelog

1.0.3: Minor bugfixes

* Fixed case with non-existent short option.
* Suppressed output of options beginning with `@` (these are generated at runtime by minicle).
* Changed `subcommands` to `subcommand` to keep with `minicle`'s convention. (`subcommands` still works.)

1.0.0: Added optional custom colors and box-drawing characters.

0.0.1: Initial release.
