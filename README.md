# Assignment Application API

## Fonctionnalités prises en charge

> PROFESSEURS
- S'inscrire / Se connecter / Se déconnecter
- Consulter ses informations (une page à propos dans laquelle le professeur peut visualiser ses infos personnelles)
- Créer / modifier une publication sur les projets 
- Consulter la liste des publications sur les projets 
- Consulter les étudiants qui ont déjà fini leurs devoirs
- Noter et commenter les devoirs des étudiants 
- Consulter la liste des étudiants dans les 2 promotions (MBDS et Licence)

> ETUDIANTS
- S'inscrire / Se connecter / Se déconnecter
- Consulter ses informations (une page à propos dans laquelle l'étudiant peut visualiser ses infos personnelles)
- Consulter la liste des publications mises en ligne par les professeurs de sa promotion
- Visualiser les détails de son devoir qui a été rendu (les remarques, les notes, les urls des projets)
- Consulter la liste des devoirs déjà rendus 

> ENSEMBLE
- Connexion en utilisant le token [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) en suivant les documents officiels et aussi les expériences acquises durant de nombreux projets
- Les mots de passe des utilisateurs sont cryptés en utilisant **bcryptjs** (Documentation + tutoriel dans [Encrypt user password in nodejs | WebOmnizz](https://webomnizz.com/encrypt-user-password-in-nodejs/)


## Les packages installés dans le projet
Les packages installés sont disponibles dans le packages.json

## Installation
Assignment App a besoin de [Node.js](https://nodejs.org/) v10+ .
Faire un clone du projet depuis [Github Assignment App](https://github.com/elleblue0023/MBDS_2021_MBuffa_BackEnd.git )
Installation des dépendances et lancer le serveur

```sh
npm i
npm start
```

### Accès en ligne
L'application est hébérgée dans le heroku : [Heroku Assignmenet App](https://assignment-backend01.herokuapp.com/api)

_Le long du projet, quelques explications de nos collègues nous ont fortement aidés_.
