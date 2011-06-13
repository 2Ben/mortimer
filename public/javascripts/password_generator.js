/*var PasswordGenerator = function(generatorLink, inputElements) {
  this.generatorLink    = generatorLink;
  this.fieldsToPopulate = inputElements;
  this.lowerAlpha       = "abcdefghijklmnopqrstuvwxyz".split("");
  this.upperAlpha       = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  this.numbers          = "0123456789".split("");
  this.alternates       = "!@#$%^&*".split("");
  this.passwordPool     = [this.lowerAlpha, this.upperAlpha, this.numbers, this.alternates];

  this.initialize();
};

PasswordGenerator.prototype = {
  initialize: function() {
    this.generatorLink.observe('click', this.populateFields.bind(this));
  },

  // Populate the given fields with a random password.
  populateFields: function() {
    var randomPassword = this.generateRandomPassword();

    this.fieldsToPopulate.each(function(field) {
      field.value = randomPassword;
    });
  },

  // Return a random string of 8-10 characters.
  generateRandomPassword: function() {
    var newPassword = [];
    var passwordLength = Math.floor(Math.random() * 3 + 8);
    for(i=0; i<=passwordLength; i++) {
      newPassword.push(this.randomCharacter());
    }

    return newPassword.join('');
  },

  // Returns a random character, with a 70% change of being an upper- or lowercase letter
  // and a 30% chance of being a number or alternate character.
  randomCharacter: function() {
    var random        = Math.random();
    var characterType = 0;
    if(random > 0.3) {
      characterType = (Math.random()) > 0.3 ? 0 : 1;
    }
    else {
      characterType = (Math.random()) > 0.5 ? 2 : 3;
    }


    var randomIndex   = Math.floor(Math.random() * this.passwordPool[characterType].length);

    return this.passwordPool[characterType][randomIndex];
  }
};

document.observe("dom:loaded", function() {

  var generator = new PasswordGenerator($('generate_password'), [$('password'), $('password_confirmation')]);

});*/

$.extend({
  password: function (length, special) {
    var iteration = 0;
    var password = "";
    var randomNumber;
    if(special == undefined){
        var special = false;
    }
    while(iteration < length){
        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
        if(!special){
            if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
            if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
            if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
            if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
        }
        iteration++;
        password += String.fromCharCode(randomNumber);
    }
    return password;
  }
});

$(document).ready(function(){
  $("#generate_password").click(function(){
    var password = $.password(8);
    $("#password").val(password);
    $("#password_confirmation").val(password);
  });
});

