const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    anonymity: {
        type: Boolean,
        required: true,
        default: false
    },
    reviewerName:{
     type:String, 
     required: true
    },
    professorName: {
        type: String,
        required: true
        // unique: true
    },
    instituteName: {
        type: String,
        required: true
    },
    instituteState: {
        type: String,
        required: true
    },
    instituteCity: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    researchArea: {
        type: String,
        required: true
    },
    professorExpertise: {
        type: String,
        required: true,
        default: ''
    },
    helpfullness: {
        type: Number,
        required: true,
        default:0      
    },
    behaviour: {
        type: Number,
        required: true,
        default:0      
    },
    youTimeSpend: {
        type: String,
        required: true,
        default: ''      
    },
    phdTimeToSpend: {
        type: String,
        required: true,
        default: ''      
    },
    msTimeToSpend: {
        type: String,
        required: true,
        default: ''      
    },
    recommend: {
        type: String,
        required: true,
        default: ''      
    },
    // comments:[commentSchema]
}, {
    timestamps: true
})

const Reviews = mongoose.model("review", ReviewSchema);
module.exports = Reviews;