/**
 * Author: Richard R.
 * Email: rrivas@usaly.co
 */
import '../styles.scss'
import ContainerComponent from "./components/container/container.component";
import ListItemComponent from "./components/list-item/list-item.component";

window.DOMElements = {
    wordList: {
        wrapper: 'container',
        wrapperContainer: 'wrp_container',
        wrapperList: 'wrp_container__list',
        wrapperListTarget: 'wrp_container__list',
        dragItem: 'draggable_item'
    }
}

const container  = new ContainerComponent();
container.render();

const listItem = new ListItemComponent();
listItem.render();