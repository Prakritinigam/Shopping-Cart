import { action, makeObservable, observable, autorun } from "mobx";

class AppStore {

    mobxTheme = "blue";
    mobxTitle = document.title;

    constructor() {
        makeObservable(this, {
            mobxTheme: observable,
            mobxTitle: observable,
            updateTitle: action,
            updateTheme: action
        });
        autorun(this.logDetails);
    }

    updateTheme(theme) {
        return this.mobxTheme = theme;
    }

    updateTitle(title) {
        return this.mobxTitle =title;
    }

    logDetails = () => {
        // console.log("Hello");
    }
}

export const mobxStore = new AppStore();
