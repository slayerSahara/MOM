function submit_form(){
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;

    if(checkForm()){
        document.getElementById('form').submit();
        alert("Name: " + fname + " " + lname + "\n\n Form Submitted Successfully.");
    }  
}

function checkForm(){
    var alph = /^[a-zA-Z]+$/;
    var ck_name = /^[A-Za-z0-9]{3,20}$/;
    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{10,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var ck_phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var ck_address = /^[A-Za-z0-9\s,.'-]{3,}$/;
    var ck_username = /^[A-Za-z0-9]{6,20}$/;
    var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;

    if(!alph.test(form.fname.value) || !alph.test(form.lname.value)){
        alert("Error: Input must contain only alphabetical characters");
        form.fname.focus();
        form.lname.focus();
        return false;
    }

    if(!ck_name.test(form.fname.value) || !ck_name.test(form.lname.value)){
        alert("Error: Input must be between 3 and 20 characters");
        form.fname.focus();
        return false;
    }

    if(!ck_email.test(form.email.value)){
        alert("Error: Input must be an email");
        form.email.focus();
        return false;
    }

    if(!ck_phone.test(form.phone.value)){
        alert("Error: Input must be in phone number format with 10 numbers (Ex: 8885550000)");
        form.phone.focus();
        return false;
    }

    if(!ck_address.test(form.address.value)){
        alert("Error: Input must be a number followed by a street name (Ex: 222 Main St)");
        form.address.focus();
        return false;
    }

    if(!ck_username.test(form.username.value)){
        alert("Error: Input must be between 6 and 20 characters with no special characters (Ex: bob12)");
        form.username.focus();
        return false;
    }

    if(!ck_password.test(form.password.value) || !ck_password.test(form.password_verify.value)){
        alert("Error: Input must be between 6 and 20 characters & can have special characters (Ex: letmein1234)");
        form.password.focus();
        form.password_verify.focus();
        return false;
    }

    if(form.password.value != form.password_verify.value){
        alert("Error: Passwords must match");
        form.password.focus();
        return false;
    }
    return true;
}