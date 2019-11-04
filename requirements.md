
Software Requirements

Vision

The vision of the product is to provide a user-friendly interface to the user to help to evaluate his project, his project collaborators by easy understandable graphic outputs according to select base organizations and collaborators. 


This app will help user to evaluate his team of his project by seeing the working progress of team and  each collaborator of the team separately in short term so that he can re-organise his team and their working progress more efficient accordingly current work progress to finish the step of the assignments with better delivery times.  

Our product will help you to make your projects more efficient, so you would have better delivery dates to satisfy your clients and able to get more projects as you finish the project early. As you would finish your projects less time, you would have cost improvement. Also as you can evaluate work progress between the collaborators and you can balance the work weight between collaborators so your good working valuable collaborator would not burn out. Collaborators of  the project would sense the work share justice so it would prevent most of the personal problems  between collaborators and team. As you can evaluate the performance of collaborators separately, for the next projects you can select the collaborators by their performance or you can drop the collaborators who are insufficient for your current project. 

Scope (In/Out)

IN - What will your product do
The web app will provide log-in function
The web app will provide selections based on organizations. 
The web app will graph based on collaborators filter. 
Users will be able to see “about us” page.
The web app will provide various graphing options for rendering the data.

OUT - What will your product not do.
My app will never turn into an IOS or Android app.

MVP
Sign-in using username and password.
Select based on organizations.
Graph based on collaborators. 
Offer different graphing options for results rendering.
Stretch Goals
Select based on repos.
Offer more display types.

Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:
An admin can log into user accounts.
A user can select based on organizations.
A user can filter collaborators when graphing the result.
A user see the “about us” page of the developers.

Non-Functional Requirements 
Security : The security is important for the projects so we decided not to use local storage on front end and we will use safevalues at the back end. We will do password login for the app.
Efficiency: This may be a factor partly out of our control but we want the experience to be mostly lag free. We will be looking at controlling a fairly diverse set of data that may take multiple superagent or client calls. Keeping our workflow streamlined and in an efficient order will be crucial to loading everything in a timely manner.

Data Flow
Once the user is on the home page, they have the options to input username and password, which will be sent to the server, and the server will make an API call to GitHub to get information about that user. The program will display a list of organizations that the user is a part of, and the user has the option to select an organization, which makes a second API call to collect further information about that organization. The information will be parsed and then stored in a manner to be displayed to charts and graphs. There would be an option to compare information against the average data from other organizations.
