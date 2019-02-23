// Buscar elemento pela id
const $GetId = function(id) {
    return document.getElementById(id);
}

// Buscar elemento pela tag name
const $getTagName = function(tagName) {
    return document.getElementsByTagName(tagName);
}

// Criar novo elemento
const $createEl = function(el) {
    return document.createElement(el);
}

export * from "./functions";