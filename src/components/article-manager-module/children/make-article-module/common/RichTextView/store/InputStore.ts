import {action, computed, makeObservable, observable} from "mobx";

class InputStore {

    input: string = "";

    constructor() {
        makeObservable(this, {
            input: observable,
            setInput: action,
            getInput: computed,
            clear: action
        })
    }

    clear() {
        this.input = "";
    }

    setInput(text: string) {
        this.input = text;
    }

    get getInput() {
        return this.input;
    }
}

export default new InputStore();