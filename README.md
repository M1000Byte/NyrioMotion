
NyrioMotion est une interface de téléopération robotique permettant de contrôler un bras robotisé Niryo Ned 2 en temps réel via la reconnaissance de mouvements de la main (Leap Motion).

Ce projet a été réalisé dans le cadre de notre deuxième année d'informatique.
 
 # 👥Auteurs
 
[**Daouda**](https://github.com/Daouda94)<br/>
[**Wellington**](https://github.com/M1000Byte)<br/>

# 🚀 Fonctionnalités

    Interface Web de Contrôle : Dashboard interactif pour visualiser l'état du système.

    Tracking de Main (Leap Motion) : Détection en temps réel de la position (X, Y, Z) et des gestes (Pincement, Poing fermé).

    Communication Client-Serveur : Architecture utilisant Flask (Python) pour faire le pont entre le navigateur Web et le robot.

    Contrôle du Robot (Niryo Ned 2) :

        Connexion/Déconnexion à distance via l'interface.

        Pilotage de la Pince (Gripper) : Ouverture/Fermeture par geste naturel.

        Déplacement du Bras : Mouvements relatifs basés sur la position de la main.

 # 🛠️Prérequis
Matériel

    Robot Niryo Ned 2 (Connecté au même réseau que l'ordinateur).

    Leap Motion Controller (v1).

    Ordinateur sous Windows (recommandé pour les drivers Leap Motion v1).

# 📦 Logiciels
 
 * [**Python**](https://www.python.org/) ( 3.10.11 )
 * [**Drivers Leap Motion**](https://www.ultraleap.com/downloads/leap-controller) (  Orion 4.10 )
   
 >[!WARNING]
>Important faut cocher la case dans le panneau de commande de la leap motion " Autoriser les applications Web".

 # 📦Installation

Cloner le projet (ou extraire l'archive) :

```console
cd NyrioMotion
```

Installer les dépendances Python : Ouvrez un terminal dans le dossier du projet et exécutez :


```console
pip install flask pyniryo2 roslibpy==1.2.0
```

Configuration Réseau :

    Ouvrez le fichier app.py.

    Modifiez la variable ROBOT_IP avec l'adresse IP de votre robot (par défaut 10.10.10.10 en mode Hotspot ou l'adresse IP réseau locale).

Python

    ROBOT_IP = "172.20.21.191" # Exemple

# ▶ Utilisation

    Lancer le Serveur : Dans le terminal, lancez la commande :
    Bash

    python app.py

    Accéder à l'Interface : Ouvrez votre navigateur web et allez à l'adresse indiquée (généralement) : http://127.0.0.1:5000

    Piloter le Robot :

        Cliquez sur le bouton "CONNECTER" sur l'interface web.

        Placez votre main au-dessus de la Leap Motion.

        Fermer le poing  : Ferme la pince du robot.

        Ouvrir la main  : Ouvre la pince.

        Bouger la main (Gauche/Droite) : Fait pivoter la base du robot.

        Bouger la main (Haut/Bas) : Fait monter ou descendre le bras.

# ⚙️ Détails Techniques

    Frontend : HTML5, CSS3, JavaScript (LeapJS). Utilise fetch pour envoyer des commandes asynchrones au serveur sans recharger la page.

    Backend : Python (Flask). Reçoit les requêtes JSON du frontend et utilise la librairie pyniryo2 pour convertir ces coordonnées en commandes moteurs.

    Sécurité : Implémentation d'un système de limitation de débit dans le JavaScript pour éviter de saturer le robot de commandes.
