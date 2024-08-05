"use strict";
const passwordDisplay=document.querySelector("password_display");
const passwordplaceholder=document.querySelector(".password_placeholder");
const passwordCopyText=document.querySelector(".copy_text");
const passwordCopyBtn=document.querySelector(".copy_btn");

const passwordForm=document.querySelector('.password_setting');
const CharCount=document.querySelector(".char_count");
const lengthslider=document.querySelectorAll(".char_length_slider");
const checkBoxes=document.querySelector("input[type=checkbox]");

const strengthDesc =document.querySelector(".strength-rating_text");
const strengthBars =document.querySelectorAll(".bar");

const Character_sets = {
    uppercase:["ABCDEFGHIJKLMNOPQRSTUVWXYZ",26],
    lowercase:["abcdefghijklmnopqrstuvwxyz",26],
    number:["1234567890",10],
    Symbols:["!@#$%^&*()",10],
};
 let cancopy = false;

 const getSliderval =()=>{
    CharCount.textContent=lengthslider.Value;


 };
 const styleRangSlider =() => {
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    const val = lengthSlider.value;

    lengthSlider.style.backgroundSize=
       ((val-min)*100)/(max-min)+ "% 100%";
};
const handlSliderInput =()=>{
    getSliderval();
    styleRangSlider();
};
//=================
//reset Bar sylte
//==================
const resetBarSyltes = () => {
    strengthBars.forEach((bar) => {
     bar.style.backgroundcolor="transparent";
     bar.style.bordercolor="hsl(252,11%,91%)";   
    });
};
const stylebars =([...barElment],color) => {
    barElment.forEach(bar) => {
     bar.style.backgroundcolor=color;
     bar.style.bordercolor=color;   
    });
}
const StyleMeter =(rating)=>{
    const text=rating[0];
    const numBars=rating[1];
    const barToFill=Array.from(strengthBars).slice(0,numBars)

    resetBarSyltes();
    strengthDesc.textContent=text

    switch(numBars){
        case 1:
            return Stylebars(barToFill,"hsl(0,91%,63%");
         case 2:
            return Stylebars(barToFill,"hsl(13,95%,66%");
         case 3:
             return Stylebars(barToFill,"hsl(42,91%,68%")
        case 4:
            return Stylebars(barToFill,"hsl(127,100%,82%");
            default:
                throw new Error("Invalid value from Bars");
    }
};
lengthslider.addEventListener("input",handlSliderInput);
//==============
//pasword genrate
//==============
const CalcStrength=(passwordLength,charpoolSize)=>{
    const strength=passwordLength*Math.log2(charpoolSize);

    if(strength<25){
        return["Too Week",1];
    }else if(strength > 25 && strength <50){
        return["week",2];
    }else if(strength > 50 && strength <75){
        return["Medium",3];
    }else{
        return["strong",4];
    }
};

const generatepassword=(e) =>{
    e.preventDefault();
    ValidInput();

    let genratepassword="";
    let includesets=[];
    let charpool=0;

    checkBoxes.forEach((box) =>{
        if(box.checked) {
            includesets.push(Character_sets[box.value][0]);
         charpool+=Character_sets[box.value][1];

}
    });

  if (includesets){
    for(let i=0;i<lengthslider.value;i++){
       const randSetIndex = Math.floor(Math.random()*includesets.length);
       const randSet=includesets[randSetIndex];

       const randCharIndex=Math.floor(Math.random()*randSet.length);
       const randchar=randSet[randCharIndex];

       genratepassword+=randchar;
    }
  }
  const strength=CalcStrength(lengthslider.value,charpool);
  StyleMeter(strength);
  cancopy=true
  passwordDisplay.textContent=genratepassword;
};
//valid
const ValidInput=()=>{
    if (Array.from(checkBoxes).every((box)=> box.checked =false)){
        alert("Make sure to check at least one check Box");
   }
};

const Copypassword=async()=>{
    if(!passwordDisplay.textContent || passwordCopyText.textContent)return;

    if(!cancopy)return;
    setTimeout(() =>{
        passwordCopyText.style.transition="all is";
        passwordCopyText.style.opacity=0;
    },1000);
    setInterval(() => {
        passwordCopyText.style.removeproperty("opacity");
        passwordCopyText.style.removeproperty("transition");
        passwordCopyText.textContent="";
    },1000);
    await navigator.clipboard.writeText(passwordDisplay,text);
    passwordCopyText.textContent="Copied!";
};
CharCount.textContent=lengthslider.value;

lengthSlider.addEventListener("Input",handlSliderInput);
passwordForm.addEventListener("submit",genratepassword);
passwordCopyBtn.addEventListener("click",Copypassword);