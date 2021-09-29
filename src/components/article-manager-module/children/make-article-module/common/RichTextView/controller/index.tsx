import {ACTIONS} from "../constants";
import InputStore from "../store/InputStore";

class RichTextViewController {

    howIsWritten(behavior: string) {
        return document.queryCommandState(behavior);
    }

    checkHowIsWritten() {
        const bolder = document.getElementById("action-bold");
        const italicer = document.getElementById("action-italic");
        const underliner = document.getElementById("action-underline");
        const alignLeft = document.getElementById("action-align-left");
        const alignRight = document.getElementById("action-align-right");
        const alignCenter = document.getElementById("action-align-center");
        const alignJustify = document.getElementById("action-align-justify");
        // @ts-ignore
        bolder.classList.toggle('_active', this.howIsWritten("bold"));
        // @ts-ignore
        italicer.classList.toggle('_active', this.howIsWritten("italic"));
        // @ts-ignore
        underliner.classList.toggle('_active', this.howIsWritten("underline"));
        // @ts-ignore
        alignLeft.classList.toggle('_active', this.howIsWritten("justifyLeft"));
        // @ts-ignore
        alignRight.classList.toggle('_active', this.howIsWritten("justifyRight"));
        // @ts-ignore
        alignCenter.classList.toggle('_active', this.howIsWritten("justifyCenter"));
        // @ts-ignore
        alignJustify.classList.toggle('_active', this.howIsWritten("justifyFull"));
    }

    fontSize(size: number, unit: string) {
        const px = size + unit;
        document.execCommand("fontSize", false, "7");
        var fontElements = document.getElementsByTagName("font");
        for (var i = 0, len = fontElements.length; i < len; ++i) {
            if (fontElements[i].size == "7") {
                fontElements[i].removeAttribute("size");
                fontElements[i].style.fontSize = px;
            }
        }
    };

    getData(data: any) {
        return data;
    }

    editing(action: ACTIONS, e: any, id: string) {
        const text: string = document.getElementById('editor')?.innerHTML ?? "";
        switch (action) {
            case "copy":
                document.execCommand('copy', false);
                break;
            case "italic":
                document.execCommand('italic', false);
                break;
            case "underline":
                document.execCommand('underline', false);
                break;
            case "bold":
                document.execCommand('bold', false);
                break;
            case "left":
                document.execCommand('justifyLeft', false);
                this.checkHowIsWritten();
                break;
            case "right":
                document.execCommand('justifyRight', false);
                this.checkHowIsWritten();
                break;
            case "center":
                document.execCommand('justifyCenter', false);
                this.checkHowIsWritten();
                break;
            case "justify":
                document.execCommand('justifyFull', false);
                this.checkHowIsWritten();
                break;
            case "h1":
                // document.execCommand("fontSize", false, "35");
                this.fontSize(45, "px");
                break;
            case "h2":
                // document.execCommand("fontSize", false, "15");
                this.fontSize(35, "px");
                break;
            case "h3":
                // document.execCommand("fontSize", false, "8");
                this.fontSize(25, "px");
                break;
        }
        InputStore.setInput(text);
        e.preventDefault();
    }

    htmlDecode(content: string) {
        let e = document.createElement('div');
        console.debug(content);
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

}

export default new RichTextViewController();