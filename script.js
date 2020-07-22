let canvas = document.getElementById("canvas");

let array = [];
for (let i = 0; i < 5; i++) {
    let c = new card(i);
    array.push(c);
}

let hammertime = new Hammer(canvas);


hammertime.add(new Hammer.Swipe({ event: 'trippleswipe', pointers: 3 }));

hammertime.on('trippleswipe', (ev) => {
    console.log("Tripple swiper;")
});
