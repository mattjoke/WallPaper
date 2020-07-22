let canvas = document.getElementById("canvas");

let spawnSquares = (id) => {
    let newDiv = document.createElement('div');
    newDiv.id = id;
    newDiv.className = 'item';
    newDiv.textContent = id + 1;
    canvas.appendChild(newDiv);
}

let randomPosition = (id) => {
    let parent = $(id).parent();
    let x = Math.floor(Math.random() * (parent.width() - 500));
    let y = Math.floor(Math.random() * (parent.height() - 250));
    $(id).css({
        'position': 'absolute',
        'top': y + 'px',
        'left': x + 'px'
    });
}


for (let i = 0; i < 5; i++) {
    spawnSquares(i);
    randomPosition('#' + i);
}

let squares = document.getElementsByClassName('item');

let pinch = new Hammer.Pinch();
let rotate = new Hammer.Pinch();

let arr = [];


$('.item').each((id) => {
    let element = document.getElementById(id);
    arr[id] = new Hammer(element);
    arr[id].add([pinch, rotate]);
    pinch.recognizeWith(rotate);

    arr[id].on("pan", (ev) => {
        $(element).css({
            'top': ev.center.y + 'px',
            'left': (ev.center.x - 50) + 'px'
        });
    });

    arr[id].on('rotate', (ev) => {
        console.log(ev.rotation)

        $(element).css({
            '-webkit-transform': 'rotation(' + ev.rotation + 'deg);',  /* Chrome, Safari 3.1+ */
            '-moz-transform': 'rotation(' + ev.rotation + 'deg); scale(' + ev.scale + ')',  /* Firefox 3.5-15 */
            '-ms-transform': 'rotation(' + ev.rotation + 'deg); scale(' + ev.scale + ')',  /* IE 9 */
            '-o-transform': 'rotation(' + ev.rotation + 'deg); scale(' + ev.scale + ')',  /* Opera 10.50-12.00 */
            'transform': 'rotation(45deg);'  /* Firefox 16+, IE 10+, Opera 12.10+ */
        })
    });

    arr[id].on('pinch', (ev) => {
        let scale = ev.scale * 2;

        console.log(id);

        $('#' + id).css({
            '-webkit-transform': 'scale(' + scale + ')',  /* Chrome, Safari 3.1+ */
            '-moz-transform': 'scale(' + scale + ')',  /* Firefox 3.5-15 */
            '-ms-transform': 'scale(' + scale + ')',  /* IE 9 */
            '-o-transform': 'scale(' + scale + ')',  /* Opera 10.50-12.00 */
            'transform': 'scale(' + scale + ')'  /* Firefox 16+, IE 10+, Opera 12.10+ */
        })
    });
});

let getArr = () => {
    console.table(arr);
}