import { marked } from "marked";

export function loadPageContent() {
    fetch("/data/page.md")
        .then(response => response.text())
        .then(data => {
            document.getElementById("markdown-output").innerHTML = marked(data);
        })
        .catch(error => console.error("Error loading page.md:", error));
}
