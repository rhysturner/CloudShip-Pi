var React           = require('react');
var io              = require('socket.io-client');
var Header          = require('./parts/Header');
var Speed           = require('./parts/Speed');
var CommentBox      = require('./parts/CommentBox');
var Clouds          = require('./parts/Clouds');
var FTScroller      = require('ftscroller');
var TimerMixin = require('react-timer-mixin');

var APP = React.createClass({
    mixins: [TimerMixin],
    getInitialState() {
        return {
            status: 'disconnected',
            speed: "0",
            data: [],
            currentSpeed: "0",
            animate: false
        }
    },

    componentWillMount() {
        console.log("client APP componentWillMount");
        this.socket = io('http://localhost:8000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('message', this.messageRec);
        this.refs = {};
        this.scroller;
    },

    // componentDidMount(){
        // var speedRef = sp;

        //console.log("FTSCROLLER",FTScroller.FTScroller);
        // console.log(1111, this.scroller);
        // console.log("container ref",this.refs.container);

        // this.refs.scroller = new FTScroller.FTScroller(
        //     document.getElementById('scrollable'), {
        //     scrollingY: false,
        //     snapping: false,
        //     singlePageScrolls: true,
        //     scrollbars: false,
        //     bouncing: false
        // });

        // console.log("ref scroller", this.refs.scroller);      

        // //this.animateScroll(this.scroller, this.state.speed);
        

        // this.refs.scroller.addEventListener('reachedend', function (response) {
        //     console.log("end");
        //     this.rest();
        // });

        // this.refs.scroller.addEventListener('reachedstart', function (response) {
        //     console.log("start");
        // });
//        this.cloudScroller();        
    // },

    connect() {
        console.log("client APP connected");
        this.setState({ status: 'connected' });
    },

    disconnect() {
        console.log("client APP disconnected");
        this.setState({ status: 'disconnected' });
    },

    messageRec(data) {
        console.log("message received data.speed", data.speed);
        this.setState({ 
            currentSpeed: data.speed, 
            data: data,
            speed: data.speed 
        });

        if(data.speed>1)
            this.setState({animate: true})
        else
            this.setState({animate: false})

        this.move();

        //console.log("moveClouds speed", this.state.speed);
        //console.log("this.refs.scroller ",this.refs.scroller);
        //this.refs.scroller.scrollBy(data.speed,0,1);

        //this.moveClouds(this.refs.scroller, data.speed);
    },

    move() {

        if(document.getElementById('scrollable').scrollLeft<4000){
            if(this.state.animate){
                console.log("scrollLeft ");   
                document.getElementById('scrollable').scrollLeft += this.state.speed * 2;
            }
        }else{
            console.log("reset ");
            document.getElementById('scrollable').scrollLeft = 0;
        }
        // else{
        //     console.log("scrollRight ");  
        //     document.getElementById('scrollable').scrollRight += 10;
        // }

        console.log("scrollLeft ",document.getElementById('scrollable').scrollLeft);   
        console.log("scrollRight ",document.getElementById('scrollable').scrollRight); 
    },


    // animateScroll(targSc, sp) {
    //     //console.log("an scr", targSc);
    //     //console.log("an speed sp", sp);
    //     //setTimeout(moveClouds(targSc, sp), 1000);
    //     setTimeout(
    //       () => { this.moveClouds(this.refs.scroller, this.state.speed) },
    //       2000
    //     );
    // },

    // moveClouds(targ, sp) {
    //     //console.log("scrollLeft", targ.scrollLeft);
    //     console.log("moveClouds speed", this.state.speed);
    //     console.log("this.refs.scroller ",this.refs.scroller);
    //     if(targ)
    //         targ.scrollBy(sp,0,1);
    //     else

    // //     animateScroll(this.refs.scroller, this.state.speed);
    // },

    rest(){
        // speed = 0;
        this.refs.scroller.scrollLeft = 0;
        console.log("rest scroll");
    },

    render() {

        var clds = [];
        for (var i = 0; i < 10; i++) {
          clds.push(<Clouds scale="0.5" speed={this.state.currentSpeed}/>);
        }

        return (
            <div id="cloudsship">
                <h1 >Speed: {this.state.currentSpeed}</h1>
                <div id='scrollable' 
                    ref={(c) => this.refs.container = c}>
                    <div id='sectionwrapper'>                    
                        <ul className="comments">
                              {clds}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = APP;



var comments = [
    {
        "author": "Pete Hunt",
        "text": "Hey there!"
    },
    {
        "author": "Paul O’Shannessy",
        "text": "React is *great*!"
    },
    {
        "author": "jon doe",
        "text": "he"
    },
    {
        "author": "Rhys",
        "text": "hello work"
    },
    {
        "author": "Henry",
        "text": "*help me fly*"
    },
    {
        "author": "rhys",
        "text": "##No"
    },
    {
        "author": "hennry",
        "text": "###Whyyyy?"
    },
    {
        "author": "ed",
        "text": "nifucvsbfnjkc"
    },
    {
        "author": "cvdaf",
        "text": "vdfvdf"
    },
    {
        "author": "rhys",
        "text": "react and masnry is fun"
    },
    {
        "author": "joe",
        "text": "blablablabla bla"
    },
    {
        "author": "Hienburg",
        "text": "Don't be a fool jessy"
    },
    {
        "author": "Jessy",
        "text": "make me"
    },
    {
        "author": "*rhys*",
        "text": "hi"
    },
    {
        "author": "rhys",
        "text": "*Hi*"
    },
    {
        "author": "dfersfes",
        "text": "fsdfds"
    },
    {
        "author": "fdsfsd",
        "text": "fdsf"
    },
    {
        "author": "fdsfsd",
        "text": "fsdfd"
    }
]