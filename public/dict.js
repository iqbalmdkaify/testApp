const btn = document.querySelector(".submit-word");
const wordInput = document.querySelector(".word");

const today = new Date();

function getMonth() {
    let result = new Date().toLocaleString("en-us", {
        month: "short",
        year: "numeric",
    });
    result = result.slice(0, 3);

    return result;
}

const date = `${today.getDate()} ${getMonth()} ${today.getFullYear()}`;
const time = `${today.getHours()}:${today.getMinutes()}`;

btn.addEventListener("click", () => {
    const word = wordInput.value;
    const wordBody = document.querySelector(".definition");

    if (!word) {
        document.querySelector(".definition").textContent = "No words searched";
        return;
    } else {
        fetch("/dict", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                word: `${word}`,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.available) {
                    document.querySelector(".save-word").style.display =
                        "block";

                    const bookmarkBtn = document.querySelector(".save-word");

                    bookmarkBtn.disabled = "";

                    bookmarkBtn.addEventListener("click", () => {
                        fetch("/save", {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                word: `${data.word}`,
                                date: `${date}`,
                                time: `${time}`,
                            }),
                        });
                        bookmarkBtn.disabled = "disabled";
                    });
                    wordBody.textContent = `${data.definition}`;
                } else {
                    wordBody.textContent = `No definition`;
                }
            });
    }
});
