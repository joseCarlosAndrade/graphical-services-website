export function setCSSVar(variable : string, value : string) {
    document.documentElement.style.setProperty(variable, value);
}