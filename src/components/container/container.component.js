/**
 * Author: Richard R.
 * Email: rrivas@usaly.co
 * 
 * Main component to encapsulate components
 */
class ContainerComponent {
    render() {
        const elementContainer = document.createElement('div');
        elementContainer.classList.add(window.DOMElements.wordList.wrapper);
        elementContainer.innerHTML = '<h1>List items</h1>';
        const body = document.querySelector('body');
        body.appendChild(elementContainer);
    }
}

export default ContainerComponent;