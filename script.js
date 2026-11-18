const intro = document.getElementById("intro");
const letter = document.getElementById("letter");

const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("openLetter");

const pages = [
    ...document.querySelectorAll(".page")
];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const pageCount = document.getElementById("pageCount");
const dots = document.getElementById("dots");
const hearts = document.getElementById("hearts");

let currentPage = 0;


pages.forEach((page, index) => {

    const dot = document.createElement("span");

    dot.className = "dot";

    dot.addEventListener("click", () => {
        showPage(index);
    });

    dots.appendChild(dot);

});


function showPage(index) {

    currentPage = Math.max(
        0,
        Math.min(
            index,
            pages.length - 1
        )
    );


    pages.forEach((page, i) => {

        page.classList.toggle(
            "active",
            i === currentPage
        );

    });


    [
        ...dots.children
    ].forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentPage
        );

    });


    prevBtn.disabled =
        currentPage === 0;

    nextBtn.disabled =
        currentPage === pages.length - 1;


    pageCount.textContent =
        `${currentPage + 1} / ${pages.length}`;


    if (
        currentPage ===
        pages.length - 1
    ) {
        burstHearts();
    }

}


function openLetter() {

    document.querySelector(".flap").style.transform =
        "rotateX(180deg)";

    document.querySelector(".seal").style.opacity =
        "0";


    setTimeout(() => {

        intro.classList.add(
            "fade-out"
        );


        setTimeout(() => {

            intro.style.display =
                "none";

            letter.classList.remove(
                "hidden"
            );


            letter.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(20px)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],
                {
                    duration: 900,
                    easing: "ease-out",
                    fill: "both"
                }
            );


            burstHearts();

        }, 700);

    }, 450);

}


openBtn.addEventListener(
    "click",
    openLetter
);


envelope.addEventListener(
    "click",
    openLetter
);


prevBtn.addEventListener(
    "click",
    () => {
        showPage(
            currentPage - 1
        );
    }
);


nextBtn.addEventListener(
    "click",
    () => {
        showPage(
            currentPage + 1
        );
    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            letter.classList.contains(
                "hidden"
            )
        ) {
            return;
        }


        if (
            event.key ===
            "ArrowRight"
        ) {
            showPage(
                currentPage + 1
            );
        }


        if (
            event.key ===
            "ArrowLeft"
        ) {
            showPage(
                currentPage - 1
            );
        }

    }
);


function burstHearts() {

    for (
        let i = 0;
        i < 16;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement(
                    "span"
                );


            heart.className =
                "heart";


            heart.textContent =
                Math.random() > .5
                    ? "♥"
                    : "♡";


            heart.style.left =
                `${Math.random() * 100}%`;


            heart.style.fontSize =
                `${12 + Math.random() * 18}px`;


            heart.style.setProperty(
                "--drift",
                `${-80 + Math.random() * 160}px`
            );


            hearts.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 5000);

        }, i * 80);

    }

}


showPage(0);