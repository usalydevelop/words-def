/**
 * Author: Richard R.
 * Email: rrivas@usaly.co
 */
import "../utils/datastore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import '../../styles.scss'
import ContainerComponent from "../components/container/container.component";
import WordsComponent from '../components/words/words.component';

window.DOMElements = {
    wordList: {
        wrapper: 'container',
        wrapperContainer: 'wrp_container',
        wrapperList: 'wrp_container__list',
        wrapperListTarget: 'wrp_container__list',
        dragItem: 'draggable_item'
    }
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (!uid) {
            location.href = '/word-list.html';
        }
        const container  = new ContainerComponent();
        container.render();
        const words = new WordsComponent();
        words.render();
    } else {
        // If user is not logged, it will redirect to login page
        location.href = '/login.html';
    }
});