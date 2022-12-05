//https://teachablemachine.withgoogle.com/models/HG1_CezUQ/


Webcam.set({
    width:350,
    height:300,
    image_format: "jpg",
    jpg_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src='"+data_uri+"'>";
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/HG1_CezUQ/model.json", modelLoaded);

function modelLoaded()
{
    console.log("model is loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
     if(error)
     {
        console.error(error);
     }
     else
     {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        
        if(results[0].label == "Thumbs Up")
        {
            toSpeak = "all the best!";
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "Ok")
        {
            toSpeak = "this is looking amazing!";
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if(results[0].label == "L")
        {
            toSpeak = "el bozo!";
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        speak();
        
     }
}