objects = [];
status = "";

function preload() {

}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "")
    {   
        objectDetector.detect(video, gotResult);
        for (i = 0; i <objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected";
            fill("#1132cd");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("e21717");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if( objects[i].label == object_name ){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = objects[i].label+" found";
                speak_data = objects[i].label+" found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);   
            }
            else {
                document.getElementById("status").innerHTML = objects[i].label+" not found";
                speak_data = objects[i].label+" not found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);   
            }
        }
    }
}
function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}