import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, 'Subscription name is required'],
            trim : true,
            minLength : 2,
            maxLength : 100, 
        },

        price : {
            type : Number,
            required : [true, 'Subscription price is required'],
            min : [0, 'Price must be greater than 0'],
        },
        currency : {
            type : String,
            enum : ['USD', 'EUR', 'PHP'],
            default : 'USD',
        },
        frequency : {
            type : String,
            enum : ['daily', 'weekly', 'monthly', 'yearly'],
        },
        category : {
            type : String,
            enum : ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
            required : true,
        },
        paymentMethod : {
            type : String,
            required : true,
            trim : true,
        },
        status : {
            type : String,
            enum : ['active', 'cancelled', 'expire'],
            default : 'active',
        },

        startDate : {
            type : Date,
            required : true,
            validate : {
                validator : (value) => value <= new Date(),
                message : 'Start date must be in the past' 
            }
        },
        renewalDate : {
            type : Date,
            required : true,
            validate : {
                validator : (value) => value > this.startDate,
                message : 'Renewal date must be after the start date', 
            }
        },

        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
            index : true,
        }
    }
)

//Auto-calculate the renewal date if missing.

//this is essentially a pre-save hook, a middleware function that runs before a document is saved to the mongoDB database.


//Basicaly, this means that for every instance of a subscriptionSchema created, this function runs first.
subscriptionSchema.pre('save', (next) => {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
        // 

        if(this.renewalDate < new Date()){
            this.status = 'expired';
        }
        next();
    }
})