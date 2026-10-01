document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('registrationForm');
    const reasonTextarea = document.getElementById('reason');
    const charCountDisplay = document.getElementById('charCount');
    
    const successModal = document.getElementById('successModal');
    const closeXBtn = document.getElementById('closeXBtn'); 

    function showError(inputElement, errorId, message) {
        const formGroup = inputElement.closest(".form-group");
        formGroup.classList.add("error");
        formGroup.classList.add("invalid-field"); 
        document.getElementById(errorId).textContent = message;
    }

    function clearError(inputElement, errorId) {
        const formGroup = inputElement.closest(".form-group");
        formGroup.classList.remove("error");
        formGroup.classList.remove("invalid-field");
        document.getElementById(errorId).textContent = "";
    }

    function validateFullName() {
        const input = document.getElementById('fullName');
        const value = input.value.trim();

        if (value === "") {
            showError(input, "fullNameError", "Full name is required");
            return false;
        } else if (value.includes("  ")) {
            showError(input, "fullNameError", "Name cannot contain double spaces");
            return false;
        } else {
            clearError(input, "fullNameError");
            return true;
        }
    }

    function validateEmail() {
        const input = document.getElementById('email');
        const value = input.value.trim();

        if (value === "") {
            showError(input, "emailError", "Email address is required");
            return false;
        } else if (value.includes(" ")) {
            showError(input, "emailError", "Email cannot contain space");
            return false;
        }

        const atIndex = value.indexOf('@');
        const lastDotIndex = value.lastIndexOf('.');

        if (atIndex === -1 || lastDotIndex === -1 || atIndex === 0 || lastDotIndex < atIndex || lastDotIndex === value.length - 1) {
            showError(input, "emailError", "Please enter a valid email address (e.g., name@example.com)");
            return false;
        } else {
            clearError(input, "emailError");
            return true;
        }
    }

    function validateAge() {
        const input = document.getElementById('age');
        const value = input.value.trim();

        if (value === "") {
            showError(input, "ageError", "Age is required");
            return false;
        }

        const parsedAge = parseInt(value, 10);
        if (isNaN(parsedAge) || parsedAge < 13) {
            showError(input, "ageError", "You must be at least 13 years old to join the legion");
            return false;
        } else if (parsedAge > 120) {
            showError(input, "ageError", "Please enter a valid age");
            return false;
        } else {
            clearError(input, "ageError");
            return true;
        }
    }

    function validateGender() {
        const checkedRadio = document.querySelector('input[name="gender"]:checked');
        const radioGroup = document.querySelector('.radio-group');

        if (!checkedRadio) {
            showError(radioGroup, "genderError", "Please select your gender orientation");
            return false;
        } else {
            clearError(radioGroup, "genderError");
            return true;
        }
    }

    function validateFavTroop() {
        const input = document.getElementById('favTroop');
        const value = input.value;

        if (value === "") {
            showError(input, "favTroopError", "Please choose a favorite troop from the list");
            return false;
        } else {
            clearError(input, "favTroopError");
            return true;
        }
    }

    function validateReason() {
        const value = reasonTextarea.value.trim();

        if (value === "") {
            showError(reasonTextarea, "reasonError", "Reason to join is required");
            return false;
        } else if (value.length > 500) {
            showError(reasonTextarea, "reasonError", "Maximum 500 characters");
            return false;
        } else {
            clearError(reasonTextarea, "reasonError");
            return true;
        }
    }

    function validateTerms() {
        const input = document.getElementById('terms');

        if (!input.checked) {
            showError(input, "termsError", "You must agree to the terms & conditions to proceed");
            return false;
        } else {
            clearError(input, "termsError");
            return true;
        }
    }

    document.getElementById('fullName').addEventListener('input', validateFullName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('age').addEventListener('input', validateAge);
    document.getElementById('favTroop').addEventListener('change', validateFavTroop);
    document.getElementById('terms').addEventListener('change', validateTerms);

    reasonTextarea.addEventListener('input', function () {
        const currentLength = reasonTextarea.value.length;
        charCountDisplay.textContent = currentLength;

        if (currentLength > 500) {
            showError(reasonTextarea, "reasonError", "Maximum 500 characters");
        } else {
            validateReason();
        }
    });

    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
        radio.addEventListener('change', validateGender);
    });

    function closeModal() {
        successModal.classList.remove('modal-active');
    }

    closeXBtn.addEventListener('click', closeModal);

    successModal.addEventListener('click', function (event) {
        if (event.target === successModal) {
            closeModal();
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isAgeValid = validateAge();
        const isGenderValid = validateGender();
        const isTroopValid = validateFavTroop();
        const isReasonValid = validateReason();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isAgeValid && isGenderValid && isTroopValid && isReasonValid && isTermsValid) {
            successModal.classList.add('modal-active');
            form.reset();
            charCountDisplay.textContent = "0";
        } else {
            const errorFields = document.querySelectorAll('.form-group.error');
            
            errorFields.forEach(formGroup => {
                formGroup.classList.remove("shake"); 
                void formGroup.offsetWidth;          
                formGroup.classList.add("shake");    

                setTimeout(() => {
                    formGroup.classList.remove("shake");
                }, 600);
            });

            if (!isNameValid) document.getElementById('fullName').focus();
            else if (!isEmailValid) document.getElementById('email').focus();
            else if (!isAgeValid) document.getElementById('age').focus();
            else if (!isTroopValid) document.getElementById('favTroop').focus();
            else if (!isReasonValid) reasonTextarea.focus();
        }
    });
});