export default class Button {
    constructor (label, action, options = {}) {
        this.button = document.createElement("button");

        const {
            parent = null
        } = options

        this.button.className = "actionButton"
        this.button.textContent = label;
        this.button.addEventListener("click", action)

        if (parent instanceof HTMLElement) {
            this.render(parent)
        }
    }

    render(parent) {
        parent.appendChild(this.button);
    }

}