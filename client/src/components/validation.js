let validateName = /^[a-zA-Z\s]+$/;
let onlyNumbers = /^[0-9]*$/;
var urlImg = /(https?:\/\/.*\.(?:png|jpg))/i;

export default function validate(input){
    let errors = {};

    if (!input.name) {
        errors.name = "A name is required";
    }
    if (!input.minHeight) {
        errors.minHeight = "Height is required";
    }
    if (!input.maxHeight) {
        errors.maxHeight = "Height is required";
    }
    if (!input.minWeight) {
        errors.minWeight = "Weight is required";
    }
    if (!input.maxWeight) {
        errors.maxWeight = "Weight is required";
    }
    if (!input.lifeMax) {
        errors.lifeMax = "Life is required";
    }
    if (!input.lifeMin) {
        errors.lifeMin = "Life is required";
    }

    if(!validateName.test(input.name)){
    errors.name = "Only letters are allowed"
    } else if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "The name must have a length between 3 and 20 characters";
    }

    if(!urlImg.test(input.image) && input.image !== ""){
        errors.image = "This is not a valid URL"
    }

    if(!onlyNumbers.test(input.lifeMax) || !onlyNumbers.test(input.lifeMin) ){
        errors.lifeMax = "Only numbers are allowed"
    } else if (parseInt(input.lifeMin) > parseInt(input.lifeMax)){
        errors.lifeMax = "Life minimum cannot be less than Life maximum"
    }

    if(!onlyNumbers.test(input.maxHeight) || !onlyNumbers.test(input.minHeight) ){
        errors.maxHeight = "Only numbers are allowed"
    } else if (parseInt(input.minHeight) > parseInt(input.maxHeight)){
        errors.maxHeight = "Height minimum cannot be less than Height maximum"
    }

    if(!onlyNumbers.test(input.maxWeight) || !onlyNumbers.test(input.minWeight) ){
        errors.maxWeight = "Only numbers are allowed"
    } else if (parseInt(input.minWeight) > parseInt(input.maxWeight)){
        errors.maxWeight = "Weight minimum cannot be less than Weight maximum"
    }

    return errors
}