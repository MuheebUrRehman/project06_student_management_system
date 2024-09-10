#! /usr/bin/env node
import inquirer from "inquirer";
// Main function to handle the student enrollment process
async function manageStudents() {
    for (let randomNumber = 1; randomNumber <= 100; randomNumber++) {
        let myBalance = 0;
        const answer = await inquirer.prompt([
            {
                name: "students",
                type: "input",
                message: "Enter student name:",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "Please enter a non-empty value.";
                },
            },
            {
                name: "courses",
                type: "list",
                message: "Select the course to enroll:",
                choices: ["ms office", "html", "javascript", "typescript", "python"],
            },
        ]);
        const tutionfee = {
            "ms office": 2000,
            html: 2500,
            javascript: 5000,
            typescript: 6000,
            python: 10000,
        };
        console.log(`\nTuition fee: ${tutionfee[answer.courses]}\n`);
        console.log(`Balance: ${myBalance}\n`);
        const paymentType = await inquirer.prompt([
            {
                name: "payment",
                type: "list",
                message: "Enter payment method:",
                choices: ["bank transfer", "easypaisa", "jazzcash"],
            },
            {
                name: "amount",
                type: "input",
                message: "Transfer money:",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "Please enter a non-empty value.";
                },
            },
        ]);
        console.log(`You selected payment method: ${paymentType.payment}`);
        const tuitionFee = tutionfee[answer.courses];
        const paymentAmount = parseFloat(paymentType.amount);
        if (tuitionFee === paymentAmount) {
            console.log(`Congratulations! You have successfully enrolled in ${answer.courses}\n`);
            const nextStep = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "What would you like to do next?",
                    choices: ["view status", "exit"],
                },
            ]);
            if (nextStep.select === "view status") {
                console.log("\n***** Status *****");
                console.log(`Student Name: ${answer.students}`);
                console.log(`Student ID: ${randomNumber}`);
                console.log(`Course: ${answer.courses}`);
                console.log(`Tuition Fees Paid: ${paymentAmount}`);
                console.log(`Balance: ${(myBalance += paymentAmount)}`);
            }
            else {
                console.log("\nExiting student management...\n");
            }
        }
        else {
            console.log("Invalid amount for the selected course.\n");
        }
        const addMore = await inquirer.prompt([
            {
                name: "more",
                type: "confirm",
                message: "Would you like to add more students?",
            },
        ]);
        if (!addMore.more) {
            break;
        }
    }
}
// Start the student management process
manageStudents();
