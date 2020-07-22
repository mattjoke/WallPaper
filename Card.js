class card {
    constructor(id) {
        this.id = id;
        this.createDiv();
        this.myself = $('#' + this.id);
        this.parent = this.myself.parent();
        this.x = Math.floor(Math.random() * (this.parent.width() - 500));
        this.y = Math.floor(Math.random() * (this.parent.height() - 250));
        this.drawDiv();
        this.man = undefined;
        this.scale = 1;

        this.initGestures();
    }
    drawDiv = () => {
        $(this.myself).css({
            'top': this.y + 'px',
            'left': this.x + 'px'
        });
    }
    createDiv = () => {
        let newDiv = document.createElement('div');
        newDiv.id = this.id;
        newDiv.className = 'item';
        newDiv.textContent = this.id + 1;
        document.getElementById('canvas').appendChild(newDiv);
    }

    initGestures = () => {
        let element = document.getElementById(this.id);

        this.man = new Hammer.Manager(element);
        let pinch = new Hammer.Pinch();
        let pan = new Hammer.Pan();

        pan.requireFailure(pinch);

        this.man.add([pan, pinch]);

        let panHandler = (ev) => {
            this.myself.css({
                'top': ev.gesture.center.y + 'px',
                'left': (ev.gesture.center.x - 50) + 'px'
            });
        }

        let pinchHandeler = (ev) => {
            const scale = ev.gesture.scale * 1.2;
            this.scale = scale;
            this.myself.css({
                '-webkit-transform': 'scale(' + scale + ')',
                '-moz-transform': 'scale(' + scale + ')',
                '-ms-transform': 'scale(' + scale + ')',
                '-o-transform': 'scale(' + scale + ')',
                'transform': 'scale(' + scale + ')'
            });
        }

        this.myself.hammer().bind("pinch", pinchHandeler);
        this.myself.hammer().bind("pan", panHandler);
    }
}