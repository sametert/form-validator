const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const password = document.getElementById("password");
const rPassword = document.getElementById("rPassword");

error = (input,message) => {
    input.className = "form-control is-invalid";
    const div = input.nextElementSibling;
    div.innerText = message;
    div.classList.add("invalid-feedback");
}

success = (input,mesaj) => {
    input.className = "form-control is-valid";  
}

const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.value != "") {
        if(re.test(email.value)) {
            success(email);
        }else {
            error(email, "hatali girdiniz.");
        }
    }

};

checkRequired = inputs => {
    inputs.forEach(input => {
        if(input.value === "") {
            error(input, `${input.id} is required.`);
        }else {
            success(input);
        }
    });
}

checkLength = (input , min , max)  => {
    if(input.value != "") {
        if(input.value.length < min) {
            error(input, `${input.id} en az ${min} karakter olmalıdır.`);
        }else if(input.value.length > max) {
            error(input, `${input.id} en fazla ${max} karakter olmalıdır.`);
        }else {
            success(input);
        }
    }  
}


checkPassword = (input1,input2) => {
    if(input1.value !== input2.value) {
        error(input2, "Parolalar eşleşmiyor.");
    }

}


function phonenumber(inputtxt){
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if(inputtxt.value != "") {
    if((inputtxt.value.match(phoneno))){
        success(inputtxt);
    }else{
      error(inputtxt, `${inputtxt.id} istenilen şekilde girmediniz.`); 
    } 
  }
}


var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");


password.addEventListener("focus", () => {
    document.getElementById("psword").style.display = "block";
});

password.addEventListener("blur", () => {
    document.getElementById("psword").style.display = "none";
});

password.addEventListener("keyup", () => {
  var lowerCaseLetters = /[a-z]/g;
  if(password.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(password.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(password.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(password.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
});

form.addEventListener("submit", e => {
    e.preventDefault();  //varsayılan özelliğini devre dışı bıraktık(submit özelliği)

    checkRequired([userName,email,tel,rPassword]);

    validateEmail(email);

    checkLength(userName,4,8);
    
    checkPassword(password,rPassword);
  
    phonenumber(tel);


});