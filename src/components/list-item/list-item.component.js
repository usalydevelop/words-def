/**
 * Author: Richard R.
 * Email: rrivas@usaly.co
 * 
 * Drag and drop component to encapsulate components
 */
import './list-item.component.scss';

class ListItemComponent {
    label = 'render list-item component';
    wrapper = document.querySelector(`.${window.DOMElements.wordList.wrapper}`);

    dragStartEvent(e) {
        const id = e.target.id;
        e.dataTransfer.setData('text/plain', id);
        setTimeout(() => {
            e.target.classList.add('d-none');
        }, 0);
    }

    dragEnterEvent(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }
    
    dragOverEvent(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }
    
    dragLeaveEvent(e) {
        e.target.classList.remove('drag-over');
    }
    
    dropEvent(e) {
        e.target.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        // Showing item draggable
        e.target.appendChild(draggable);
        draggable.classList.remove('d-none');
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 5);
    }

    registerListElement() {
        const elementContainer = document.createElement('div');
        elementContainer.classList.add(window.DOMElements.wordList.wrapperContainer);
        elementContainer.innerHTML = this.templateElements();
        this.wrapper.appendChild(elementContainer);
    }

    templateElements() {
        return `
            <div class="${window.DOMElements.wordList.wrapperList}">
                <div draggable="true" id="item_${this.generateRandomNumber()}" class="${window.DOMElements.wordList.dragItem}"></div>
                <div draggable="true" id="item_${this.generateRandomNumber()}" class="${window.DOMElements.wordList.dragItem}"></div>
                <div draggable="true" id="item_${this.generateRandomNumber()}" class="${window.DOMElements.wordList.dragItem}"></div>
            </div>
            <div class="${window.DOMElements.wordList.wrapperList}"></div>
        `;
    }

    events() {
        // Float item
        const elmentListWord = document.querySelectorAll(`.${window.DOMElements.wordList.dragItem}`);
        elmentListWord.forEach(element => {
            element.addEventListener('dragstart', this.dragStartEvent);
        })
        // Container items
        const elementContainers = document.querySelectorAll(`.${window.DOMElements.wordList.wrapperList}`);
        elementContainers.forEach(element => {
            element.addEventListener('dragenter', this.dragEnterEvent)
            element.addEventListener('dragover', this.dragOverEvent);
            element.addEventListener('dragleave', this.dragLeaveEvent);
            element.addEventListener('drop', this.dropEvent);
        });
    }

    renderTemplate() {
        const elementContainer = document.querySelector(`#${window.DOMElements.wordList.wrapperList}`);
        elementContainer.innerHTML = this.template();
    }

    render() {
        this.registerListElement();
        this.events();
    }
}

export default ListItemComponent;