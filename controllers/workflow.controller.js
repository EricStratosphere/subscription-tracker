import {createRequire} from 'module';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';

const require = createRequire(import.meta.url);
//this allows us to use the require keyword despite our codebase being of type module.

// import {serve} from "@upstash/workflow/express"
const { serve }= require('@upstash/workflow/express');
//we use import instead of require in this instance since there is a chance that upstash workflow is written using commonJS. So importing may not work.
 
const REMINDERS = [7, 5, 2, 1];
export const sendReminders = serve( async (context) => {
    const {subscriptionId} = context.requestPayload;
    console.log("Subscription ID : ", subscriptionId);
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.staus !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }
    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }
    }
});

const fetchSubscription = async (context, subscriptionId)=>{
    return await context.run('get subscription', ()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async(context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, subscription) => {
    return await context.run(label, ()=>{
        console.log(`Triggering ${label} reminder`);
    })
}