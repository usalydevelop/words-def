/**
 * Author: Richard R.
 * Email: rrivas@usaly.co
 * 
 * Main component to encapsulate components
 */
class ContainerComponent {
    render() {
        const elementContainer = document.querySelector('#app');
        elementContainer.classList.add(window.DOMElements.wordList.wrapper);
        const body = document.querySelector('body');
        body.appendChild(elementContainer);
    }
}

export default ContainerComponent;