# Assignment Application API

## Fonctionnalités pris en charges

> PROFESSEURS
- S'inscrire / Se connecter / Se déconnecter
- Consulter ses informations (une page à propos dans laquelle le professeur veut visualiser les informations lui concernant)
- Créer / modifier une publication sur les projets 
- Consulter la liste des publications sur les projets 
- Consulter les étudiants qui ont déjà fini son devoir 
- Noter et commenter les devoirs des étudiants 
- Consulter la liste des étudiants dans les 2 promotions (MBDS et Licence)

> ETUDIANTS
- S'inscrire / Se connecter / Se déconnecter
- Consulter ses informations (une page à propos dans laquelle l'étudiant veut visualiser les informations lui concernant)
- Consulter la liste des projets mis en lignes par les professeurs (qui les correspond)(de leur classe)
- Visualiser le détail de son devoir qui a été rendu (les remarques, les notes, les urls des projets)
- Consulter la liste des devoirs déjà rendu 

> ENSEMBLE
- Connexion en utilisant le token [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) en suivant les documents officiels et aussi les expériences acquises durant des nombreuses projets
- Les mots de passes des utilisateurs sont cryptés en utilisant **bcryptjs** (Documentation + tutoriel dans [Encrypt user password in nodejs | WebOmnizz](https://webomnizz.com/encrypt-user-password-in-nodejs/)


## Les packages installés dans le projet
Les packages installés sont disponible dans le packages.json

## Installation
Assignment App a besoin de [Node.js](https://nodejs.org/) v10+ .
Faire un clone du projet depuis [Github Assignment App](https://github.com/elleblue0023/MBDS_2021_MBuffa_BackEnd.git )
Installation des dépendances et faire marcher le serveur

```sh
npm i
npm start
```

### Accès en ligne
L'application est hébérgé dans le heroku : [Heroku Assignmenet App](https://assignment-backend01.herokuapp.com/api)

_Le long du projet, quelques explications de nos collègues, quelques experts dans le domaine nous ont fortement aidés_.
