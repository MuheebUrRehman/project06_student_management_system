#! /usr/bin/env/ node

import inquirer from "inquirer";

for (let randomNumber = 1; randomNumber <= 100; randomNumber++) {
  let myBalance: number = 0;

  let answer = await inquirer.prompt([
    {
      name: "students",
      type: "input",
      message: "enter student name:",
      validate: function (value: string) {
        if (value.trim() !== "") {
          return true;
        }
        return "please enter a non empty value";
      },
    },
    {
      name: "courses",
      type: "list",
      message: "select the course to enroll:",
      choices: ["ms office", "html", "javascript", "typescript", "python"],
    },
  ]);

  const tutionfee: { [key: string]: number } = {
    "ms office": 2000,
    html: 2500,
    javascript: 5000,
    typescript: 6000,
    python: 10000,
  };

  console.log(`\ntution fee: ${tutionfee[answer.courses]}\n`);
  console.log(`balance:${myBalance}\n`);

  let paymentType = await inquirer.prompt([
    {
      name: "payment",
      type: "list",
      message: "enter payment method",
      choices: ["bank tranfer", "easypaisa", "jazzcash"],
    },
    {
      name: "amount",
      type: "input",
      message: "tranfer money",
      validate: function (value: string) {
        if (value.trim() !== "") {
          return true;
        }
        return "please enter a non-empty value";
      },
    },
  ]);

  console.log(`you select payment method ${paymentType.payment}`);

  const tutionfees = tutionfee[answer.courses];
  const paymentAmount = parseFloat(paymentType.amount);

  if (tutionfees === paymentAmount) {
    console.log(
      `congratulation! you have successfully enrolled in ${answer.courses}\n`
    );
    let ans = await inquirer.prompt([
      {
        name: "select",
        type: "list",
        message: "what would you like to do next",
        choices: ["view status", "exit"],
      },
    ]);
    if (ans.select === "view status") {
      console.log("\n*****status*****");
      console.log(`student name: ${answer.students}`);
      console.log(`student id: ${randomNumber}`);
      console.log(`courses: ${answer.courses}`);
      console.log(`tution fees paid: ${paymentAmount}`);
      console.log(`balance ${(myBalance += paymentAmount)}`);
    } else {
      console.log("\nexiting student management\n");
    }
  } else {
    console.log("invalid amount due to courses\n");
  }

  let addmore = await inquirer.prompt([
    {
      name: "more",
      type: "confirm",
      message: "wanna add more",
    },
  ]);
  if (addmore.more === false) {
    randomNumber = 101;
  }
}
