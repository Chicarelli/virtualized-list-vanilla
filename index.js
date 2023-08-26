
function generateItems(qtd = 10000000) {
    const elements = [];
    for (let i = 1; i <= qtd; i++) {
        elements.push(
            `<div id="element-${i}">${i}° element</div>`
        );
    }

    return elements;
}
//NO VIRTUALIZED
// window.addEventListener('load', () => {
//     const itens = generateItems().reduce((acc, string) => acc += string, '');

//     const parentDiv = document.getElementById("app");
//     const div = document.createElement("div");
//     parentDiv.appendChild(div);
//     div.innerHTML = itens;
// })

// WITH VIRTUALIZED
window.addEventListener('load', () => {
    const maxScreenHeight = window.screen.height;
    const parentDiv = document.getElementById("app");
    const elements = generateItems();

    const div = document.createElement("div");
    parentDiv.appendChild(div);

    div.innerHTML = elements[0];
    const childHeight = document.getElementById("element-1").clientHeight;
    const parentDivTotalHeight = elements.length * childHeight;
    div.innerHTML = null;

    const qtdElementsToRender = Math.floor((maxScreenHeight * 3) / childHeight);

    let elementsToRender = '';
    for (let i = 0; i <= qtdElementsToRender - 1; i++) {
        elementsToRender += elements[i];
    }

    div.innerHTML = elementsToRender;
    
    div.style.height = `${parentDivTotalHeight}px`

    function onParentScroll(event) {

        const scrollPositionStart = event.target.scrollTop
        const firstElementAtScreen = Math.floor(scrollPositionStart / childHeight);
        const elementPerScreen = maxScreenHeight / childHeight;

        const firstElementToRender = (firstElementAtScreen - elementPerScreen) <= 0 ? 1: firstElementAtScreen - elementPerScreen;
        const lastElementToRender = (firstElementAtScreen + (elementPerScreen * 2)) >= elements.length - 1 ? elements.length - 1 : firstElementAtScreen + (elementPerScreen * 2);

        let elementsToRerendedr = '';
        for (let i = firstElementToRender -1; i <= lastElementToRender; i++) {
            elementsToRerendedr += elements[i];
        }

        // console.log({firstElementAtScreen, firstElementToRender, lastElementToRender})

        div.innerHTML = elementsToRerendedr;
        document.getElementById(`element-${firstElementToRender}`).style.paddingTop = `${firstElementToRender * childHeight}px`;
    }

    parentDiv.addEventListener('scroll', onParentScroll);
})