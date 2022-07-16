import constants from "../../utils/constants";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, child, get, limitToFirst, limitToLast, query, startAt, orderByKey } from "firebase/database";

class WordsComponent {
    stringElements = {
        containerWords: '.wrp_words',
        containerDefinitions: '.wrp_words__definition',
        wordsItemDefinition: '.words__definition__item',
        wordsItemMatch: '.words__item-match',
        wordsItem: '.words__item',
        wordsItemDescription: '.words__item-description',
        btnVerify: '#btn-verify',
        btnReset: '#btn-reset',
        btnLogout: '#btn-logout',
        boxDraggable: '.box__draggable',
        matchSuccess: '.match--success',
        matchFail: '.match--fail',
        displayNone: '.d-none',
        dragOver: '.drag-over'
    };
    domElements = {
        domContainer: document.querySelector(constants.sections.idContainer),
        donContainerWords: null,
        domContainerDefinitions: null,
    }
    user = null;
    listWords = [];
    countWords = 0;

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    async loadWords() {
        const db = getDatabase();
        // const randomIndex = Math.floor(Math.random() * this.countWords);
        const randomIndex = Math.floor(this.getRandomArbitrary(1, this.countWords));
        const rows = query(ref(db, `${this.user.uid}/words`), startAt(String(randomIndex)), limitToFirst(3), orderByKey());
        const response = await get(rows);
        console.log(this.countWords, randomIndex);
        const records = response.val();
        this.listWords = [];
        for (let i in records) {
            if (records[i]) {
                this.listWords.push(records[i]); // .filter(item => !!item.id)
            }
        }
        this.renderListWords();
        this.renderListDefinition();
        this.events();
        return
        // const db = getDatabase();
        // const recentPostsRef = query(ref(db, 'posts'), limitToLast(100));

        // console.log(recentPostsRef);

        get( child(db, `${this.user.uid}/words`) ).then((snapshot) => {
            if (snapshot.exists()) {
                this.listWords = snapshot.val();
                this.renderListWords();
                this.renderListDefinition();
                this.events();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    template () {
        return `
            <h1 style="display: flex; justify-content: space-between">
                Listado de palabras
                <button class="btn" id="btn-logout">Cerrar sesión</button>
            </h1>
            <div class="${this.stringElements.containerWords.replace('.', '')}"></div>
            <h2>
                Definición de palabras
            </h2>
            <div class="${this.stringElements.containerDefinitions.replace('.', '')}"></div>
            <div class="wrp_actions">
                <button class="btn btn-green" id="${this.stringElements.btnVerify.replace('#', '')}" type="button">Verificar</button>
                <button class="btn" id="${this.stringElements.btnReset.replace('#', '')}" type="button">Resetear</button>
            </div>
        `;
    }

    // Attach HTML components to parent div
    registerElement() {
        this.domElements.domContainer.insertAdjacentHTML('beforeend', this.template());
        this.domElements.domContainerWords = document.querySelector(this.stringElements.containerWords);
        this.domElements.domContainerDefinitions = document.querySelector(this.stringElements.containerDefinitions);
    }

    renderListDefinition() {
        let template = '';
        for( let item of this.listWords ) {
            template += `
                <div class="${this.stringElements.wordsItemDefinition.replace('.', '')} d${item.id}" data-value="${item.id}">
                    <div class="${this.stringElements.wordsItemMatch.replace('.', '')}"></div>
                    <div class="${this.stringElements.wordsItemDescription.replace('.', '')}">${item.description}</div>
                </div>
            `;
        }
        this.domElements.domContainerDefinitions.insertAdjacentHTML('beforeend', template);
    }

    renderListWords() {
        let template = '';
        for( let item of this.listWords ) {
            template += `<div id="w${item.id}"
                              data-value="w${item.id}" 
                              class="${this.stringElements.wordsItem.replace('.', '')}" 
                              draggable="true">
                            ${item.word}
                        </div>`;
        }
        this.domElements.domContainerWords.insertAdjacentHTML('beforeend', template);
    }

    /** Initial method **/
    async render() {
        const auth = getAuth();
        this.user = auth.currentUser;
        // Add DOM HTML component
        this.registerElement();
        await this.getCountWords();
        await this.loadWords();
    }

    async getCountWords() {
        const db = getDatabase();
        const rows = query(ref(db, `${this.user.uid}/words`));
        const snapshot = await get(rows);
        const words = snapshot.val();
        this.countWords = words.length;
    }

    events() {
        // Float item
        const elementListWord = document.querySelectorAll(this.stringElements.wordsItem);
        elementListWord.forEach(element => {
            element.addEventListener('dragstart', this.dragStartEvent);
        })
        // Container items
        const elementContainers = document.querySelectorAll(this.stringElements.wordsItemDefinition);
        elementContainers.forEach(element => {
            element.addEventListener('dragenter', (evt) => this.dragEnterEvent(evt))
            element.addEventListener('dragover', (evt) => this.dragOverEvent(evt));
            element.addEventListener('dragleave', (evt) => this.dragLeaveEvent(evt));
            element.addEventListener('drop', (evt) => this.dropEvent(evt));
        });

        const btnVerify = document.querySelector(this.stringElements.btnVerify);
        btnVerify.addEventListener('click', evt => this.verifyWord(evt));

        const btnReset = document.querySelector(this.stringElements.btnReset);
        btnReset.addEventListener('click', evt => this.resetWords(evt));

        const btnLogout = document.querySelector(this.stringElements.btnLogout);
        btnLogout.addEventListener('click', evt => {
            const auth = getAuth();
            signOut(auth).then(() => {
                location.href="/login.html";
                // Sign-out successful.
            }).catch((error) => {
                alert(error);
                console.log(error);
                // An error happened.
            });
        });
    }

    verifyWord(evt) {
        const descriptionBoxes = document.querySelectorAll(this.stringElements.wordsItemDefinition);
        for (let box of descriptionBoxes) {
            const wordChildren = box.querySelectorAll(this.stringElements.wordsItem);
            wordChildren.forEach(word => {
                const idWord = word.dataset?.value.replace('w', '');
                const idWordDefinition = box.dataset?.value;
                if (idWord === idWordDefinition) {
                    word.parentElement.classList.add('match--success');
                } else {
                    word.parentElement.classList.add('match--fail');
                }
            })
        }
    }

    async resetWords(evt) {
        this.domElements.domContainer.innerHTML = '';
        this.registerElement();
        await this.loadWords();
    }

    dragStartEvent(e) {
        const id = e.target.id;
        e.dataTransfer.setData('text/plain', id);
        setTimeout(() => {
            // Remove item from origin box container
            e.target.classList.add('d-none');
        }, 0);
    }

    dragEnterEvent(e) {
        e.preventDefault();
        e.target.classList.add(this.stringElements.dragOver.replace('.', ''));
    }

    dragOverEvent(e) {
        e.preventDefault();
        e.target.classList.add(this.stringElements.dragOver.replace('.', ''));
    }

    dragLeaveEvent(e) {
        e.target.classList.remove(this.stringElements.dragOver.replace('.', ''));
    }

    dropEvent(e) {
        e.target.classList.remove(this.stringElements.dragOver.replace('.', ''));
        // Prevent add a draggable element inside another draggable element
        if (e.target.classList.contains(this.stringElements.wordsItem.replace('.', ''))) {
            return;
        }
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        // Showing item draggable
        e.target.appendChild(draggable);
        draggable.classList.remove(this.stringElements.displayNone.replace('.', ''));
    }
}

export default WordsComponent;