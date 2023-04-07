export default class ModalWindow{
    _modal = null;
    _contentContainer = null;
    _bodyContainer = null;

    constructor(modalId) {
        const modalElement = document.querySelector(`#${modalId}`);

        this._contentContainer = modalElement.querySelector('.modal-content')
        this._bodyContainer = modalElement.querySelector('.modal-body')

        this._modal = new Modal(modalElement, {});
    }

    /**
     * Get the current instance of Modal Window that is used
     */
    getInstance = () => this._modal;

    /**
     * Get content of the current instance
     */
    getContent = () => this._contentContainer;

    /**
     * Change the content of the current Modal Window instance
     */
    setContent = content => {
        const modal = this.getInstance;

        modal.setContent(content);
        modal.update();
    }

    /**
     * Get the body of the current Modal Window instance
     */
    getBody = () => this._bodyContainer;

    /**
     * Set the body content of the current Modal Window instance
     */
    setBody = body => {
        const container = this._bodyContainer;

        container.innerHTML = "";
        container.append(body);
    }

    /**
     * Open the current Modal Window
     */
    show = () => this._modal.show();

    /**
     * Close the current Modal Window
     */
    close = () => this._modal.hide();
}