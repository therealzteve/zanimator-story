"use strict";
var basicCommandDescription = {
    properties: [
        { "name": "id", "required": "true" }
    ]
};
var createCommandDescription = JSON.parse(JSON.stringify(basicCommandDescription));
createCommandDescription.properties = createCommandDescription.properties.concat([
    { "name": "type", "required": "true" },
    { "name": "options", "required": "false", "type": "json" }
]);
var addCommandDescription = {
    properties: [
        { "name": "parent", "required": "true" },
        { "name": "child", "required": "true" }
    ]
};
var removeCommandDescription = {
    properties: [
        { "name": "parent", "required": "true" },
        { "name": "child", "required": "true" }
    ]
};
var propertiesCommandDescription = JSON.parse(JSON.stringify(basicCommandDescription));
propertiesCommandDescription.properties = propertiesCommandDescription.properties.concat([
    { "name": "options", "required": "false", "type": "json" }
]);
var startCommandDescription = JSON.parse(JSON.stringify(basicCommandDescription));
var stopCommandDescription = JSON.parse(JSON.stringify(basicCommandDescription));
exports.commandDescriptions = {
    "create": createCommandDescription,
    "add": addCommandDescription,
    "remove": removeCommandDescription,
    "prop": propertiesCommandDescription,
    "start": startCommandDescription,
    "stop": stopCommandDescription
};
//# sourceMappingURL=command-descriptions.js.map