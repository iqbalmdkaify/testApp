const listTemplate = document.getElementById("data-save-word");

const listSection = document.querySelector(".list");

fetch("/list", {
    method: "get",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        if (!data.length) {
            document.querySelector(".message").textContent = "No bookmarks yet";
        } else {
            data.forEach((saveList) => {
                const element = listTemplate.content.cloneNode(true);

                element.querySelector(
                    "[data-word-name]"
                ).textContent = `${saveList.word}`;
                element.querySelector(
                    "[data-word-date]"
                ).textContent = `${saveList.date}`;
                element.querySelector(
                    "[data-word-time]"
                ).textContent = `${saveList.time}`;

                listSection.append(element);
            });
        }
    });
