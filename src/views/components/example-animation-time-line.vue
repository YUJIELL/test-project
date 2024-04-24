<template>
    <div>
        <ul id="cards">
            <li class="card" id="card_1">
                <div class="card__content">
                    <div>
                        <h2>Card One</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p><a href="#top" class="btn btn--accent">Read more</a></p>
                    </div>
                    <figure>
                        <img src="../../assets/img-1.jpg" alt="Image description">
                    </figure>
                </div>
            </li>
            <li class="card" id="card_2">
                <div class="card__content">
                    <div>
                        <h2>Card Two</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p><a href="#top" class="btn btn--accent">Read more</a></p>
                    </div>
                    <figure>
                        <img src="../../assets/img-2.jpg" alt="Image description">
                    </figure>
                </div>
            </li>
            <li class="card" id="card_3">
                <div class="card__content">
                    <div>
                        <h2>Card Three</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p><a href="#top" class="btn btn--accent">Read more</a></p>
                    </div>
                    <figure>
                        <img src="../../assets/img-3.jpg" alt="Image description">
                    </figure>
                </div>
            </li>
            <li class="card" id="card_4">
                <div class="card__content">
                    <div>
                        <h2>Card Four</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p><a href="#top" class="btn btn--accent">Read more</a></p>
                    </div>
                    <figure>
                        <img src="../../assets/img-2.jpg" alt="Image description">
                    </figure>
                </div>
            </li>
        </ul>
        <div style="width: 100px;height: 30vh;border: 1px solid #000;margin-left: 20px;">123</div>

    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
#cards {
    --numcards: 4;
    view-timeline-name: --cards-element-scrolls-in-body;
}

#cards {
    list-style: none;
    outline: calc(var(--outline-width) * 10) solid hotpink;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(var(--numcards), var(--card-height));
    gap: var(--card-margin);
}

#cards {
    padding-bottom: calc(var(--numcards) * var(--card-top-offset));
    margin-bottom: var(--card-margin);
}
#card_1 {
    --index: 1;
}
.card {
    --index0: calc(var(--index) - 1);
    --reverse-index: calc(var(--numcards) - var(--index0));
    --reverse-index0: calc(var(--reverse-index) - 1);
}
.card {
    outline: var(--outline-width) solid lime;
}
.card {
    position: sticky;
    top: 0;
    padding-top: calc(var(--index) * var(--card-top-offset));
}
.card__content {
    --start-range: calc(var(--index0) / var(--numcards) * 100%);
    --end-range: calc((var(--index)) / var(--numcards) * 100%);
    animation: linear scale forwards;
    animation-timeline: --cards-element-scrolls-in-body;
    animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range);
}
.card__content {
    box-shadow: 0 0.2em 1em rgba(0, 0, 0, 0.1), 0 1em 2em rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
    color: rgb(10, 5, 7);
    border-radius: 1em;
    overflow: hidden;
    display: grid;
    grid-template-areas: "text img";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    align-items: stretch;
    outline: var(--outline-width) solid blue;
}
.card__content {
    transform-origin: 50% 0%;
    will-change: transform;
}
.card__content > div {
    grid-area: text;
    width: 80%;
    place-self: center;
    text-align: left;
    display: grid;
    gap: 1em;
    place-items: start;
}
h2{
    font-weight: 300;
    font-size: 2.5em;
}
p{
    font-family: sans-serif;
    font-weight: 300;
    line-height: 1.42;
}
.card__content > figure {
    grid-area: img;
    overflow: hidden;
}
.card__content > figure > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>