let connexion = false;
let dernierEnvoi = 0;
const btn = document.getElementById('btn_toogle');

Leap.loop(function(frame) {
    let statut = document.getElementById('statut');
    
    if (frame.hands.length > 0) {
        statut.textContent = "Main détectée - Contrôle Actif";
        statut.style.color = "green";
        
        let hand = frame.hands[0];
        
        let hand_x = Math.round(hand.palmPosition[0]);
        let hand_y = Math.round(hand.palmPosition[1]);
        let hand_z = Math.round(hand.palmPosition[2]);
        let is_pinching = hand.pinchStrength > 0.8;
        let is_closed = hand.grabStrength > 0.9;
        
       
        document.getElementById('pos_x').textContent = hand_x;
        document.getElementById('pos_y').textContent = hand_y;
        document.getElementById('pos_z').textContent = hand_z;
        document.getElementById('pinch').textContent = is_pinching ? "OUI" : "Non";
        document.getElementById('grab').textContent = is_closed ? "OUI" : "Non";

       
     if (connexion) {
            statut.textContent = "Contrôle Actif (Robot Connecté)";
            statut.style.color = "green";

            let maintenant = Date.now();
            if (maintenant - dernierEnvoi > 800) {
                let payload = { x: hand_x, y: hand_y, grab: is_closed };
            
                fetch('/commande-robot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .catch(err => console.error("Erreur:", err));

                dernierEnvoi = maintenant;
            }
        } else {
            statut.textContent = "Main vue (En attente de connexion...)";
            statut.style.color = "orange";
        }

    } else {
        statut.textContent = "Pas de main détectée.";
        statut.style.color = "red";
    }
});


btn.addEventListener('click', function() {
    console.log("🔘 Bouton cliqué !");
    if (!connexion) {
  btn.disabled = true;
        fetch('/connecter', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                btn.disabled = false;
                if (data.status === "succes") {
                    connexion = true;
                    btn.textContent = "DÉCONNECTER";
                    btn.style.backgroundColor = "#dc3545";
                } else {
                    alert("Erreur connexion: " + data.msg);
                }
            });
    
        }
        
        else{
        fetch('/deconnecter', { method: 'POST' })
            .then(() => {
                console.log("Tentative de deconnexion au robot...");
                connexion = false;
                btn.textContent = "CONNECTER";
                btn.style.backgroundColor = "#28a745"; // Vert
                statut.textContent = "🔌 Déconnecté";
                statut.style.color = "gray";
            });
    }
});
