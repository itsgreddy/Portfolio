export default function (element) {
    element.style.overflow = "hidden"; // To hide the translation from 100% to 0% on Y axis
    element.innerHTML = element.innerText
        .split("")
        .map(char => { // Splitting and mapping
            return `<span class = "animatedis"></span>`; // Passing into GSAP to use stagger
        })
        .join("");

    return element;
}