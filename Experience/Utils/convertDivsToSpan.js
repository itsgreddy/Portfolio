export default function (element) {
    element.style.overflow = "hidden"; // To hide the translation from 100% to 0% on Y axis
    element.innerHTML = element.innerText
        .split("")
        .map(char => { // Splitting and mapping
            if (char === " ") {
                return `<span>${char}</span>`
            }
            return `<span class = "animatedis">${char}</span>`; // Passing into GSAP to use stagger // -- String literal and char -- //
        })
        .join("");

    return element;
}