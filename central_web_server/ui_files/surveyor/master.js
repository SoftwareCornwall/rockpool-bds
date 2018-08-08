"use strict";

function createHTMLElement(args) {
    if (args.tag === undefined) {
        throw new Error("tag must be defined");
    }

    var element = document.createElement(args.tag);

    if (args.text !== undefined) {
        element.innerHTML = args.text;
    }

    if (args.attributes !== undefined) {
        for (let key in args.attributes) {
            element.setAttribute(key, args.attributes[key]);
        }
    }

    if (args.events !== undefined) {
        for (let key in args.events) {
            element.addEventListener(key, args.events[key]);
        }
    }

    if (args.parent === undefined) {
        document.getElementsByTagName("body")[0].appendChild(element);
    } else {
        args.parent.appendChild(element);
    }

    return element;
}
