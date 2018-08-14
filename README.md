# president
president finder - like friend finder

# Firebase, Node and Express Servers

### Overview

Compatibility-based "FriendFinder" application -- basically a dating app but with information of brazilian politicians for the president running. This full-stack site take in results from users surveys, then compare their answers with those from the presidents added (It is a joke. Mot real answers...). The app will then display the name and picture of the president with the best overall match. 

Use Express to handle routing. Deployed to Heroku at https://arcane-shelf-43965.herokuapp.com/

There are aditional functionalities that were not explicited at the site as follows due to avoid mess with my brazillian friends using the site:

- https://arcane-shelf-43965.herokuapp.com/
- https://arcane-shelf-43965.herokuapp.com/newpresident
- https://arcane-shelf-43965.herokuapp.com/api/clearanswer
- https://arcane-shelf-43965.herokuapp.com/api/clearpresident


### Instructions

1. The survey  have 10 questions. Each answer should be on a scale of 1 to 5 based on how much the user agrees or disagrees with a question. The presidents answers are just random answers and it is not to be intended as truth.


the server.js ` file include  routes:

   * A GET Route to `/survey` which display the survey page.
   * A default, catch-all route that leads to `rest.html` which displays the home page. 
   * https://arcane-shelf-43965.herokuapp.com/api/answer with the json object with each user answer
   * https://arcane-shelf-43965.herokuapp.com/api/president with the json object with each president
   * https://arcane-shelf-43965.herokuapp.com/newpresident which display a page to add a new president
   * https://arcane-shelf-43965.herokuapp.com/president which display a page to view all the presidents and answers


The application's data inside of server.js as an array of objects and are saved at firebase to guarantee persistent. Each of these objects follow the format below.

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "votes": 1, //(just a joke and are not computed)
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

Determine the user's most compatible president using the following as a guide:

   * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
     * Example: 
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * the app Use the absolute value of the differences. Put another way: no negative solutions! App calculates both `5-3` and `3-5` as `2`, and so on. 
   * The closest match will be the user with the least amount of difference.

Once the app found the current user's most compatible president, display the result as a modal pop-up.
   * The modal displays both the name and picture of the closest match.
   * the answer is saved in firebase

enjoy