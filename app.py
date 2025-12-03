from flask import Flask, render_template, request, jsonify
from pyniryo2 import NiryoRobot

app = Flask(__name__)


ROBOT_IP = "172.20.21.191"
robot = None

# --- TENTATIVE DE CONNEXION AU DÉMARRAGE ---
try:
    robot = NiryoRobot(ROBOT_IP)
    robot.arm.calibrate_auto()
    print(f"✅ Prêt à connecter le robot sur {ROBOT_IP}")
except Exception as e:
    print(f"⚠️ Robot non trouvé (Mode Simulation) : {e}")
    robot = None


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/connecter', methods=['POST'])
def connecter_robot():
    global robot
    try:
        if robot is None:
            robot = NiryoRobot(ROBOT_IP)
            robot.arm.calibrate_auto()
            print(f"✅ Robot connecté sur {ROBOT_IP}")
            return jsonify({"status": "succes", "msg": "Robot connecté"})
        else:
            return jsonify({"status": "succes", "msg": "Robot déjà connecté"})
    except Exception as e:
        return jsonify({"status": "erreur", "msg": str(e)})
    
@app.route('/deconnecter', methods=['POST'])
def deconnecter():
    global robot
    try:
        if robot is not None:
            robot.end()
            robot = None
            print("🤖 Arrêt du robot")
            return jsonify({"status": "succes", "msg": "Robot déconnecté"})
        else:
            return jsonify({"status": "succes", "msg": "Aucun robot connecté"})
    except Exception as e:
        return jsonify({"status": "erreur", "msg": str(e)})
        

@app.route('/commande-robot', methods=['POST'])
def commande():
    global robot
    data = request.json 
    
    x = data.get('x', 0)
    y = data.get('y', 0)
    z = data.get('z', 0)
    grab = data.get('grab', False)
    
    print(f"✋ Reçu : X={x}, Y={y}, Poing={grab}")

    if robot:
        try:
           
            if grab:
                print("🤏 Fermer la pince")
                robot.tool.close_gripper(500)
            else:
                print("🖐️ Ouvrir la pince")
                robot.tool.open_gripper(500)
            
           
            step = 0.05 

            
            if x > 50:
                print("position x positive")
                robot.arm.shift_pose(6, -step) # Tourne à droite
            elif x < -50:
                print("position x negative")
                robot.arm.shift_pose(6, step)  # Tourne à gauche

           
            if y > 200:
                robot.arm.shift_pose(3, step)  
            elif y < 100:
                robot.arm.shift_pose(3, -step) 
            
            if z > 200:
                robot.arm.shift_pose(3, step)  
            elif z < 100:
                robot.arm.shift_pose(3, -step) 
            
        except Exception as e:
            print(f"Erreur Robot: {e}")
            return jsonify({"status": "erreur", "msg": str(e)})

    return jsonify({"status": "succes", "donnees": data})


if __name__ == '__main__':
   
    app.run(debug=True, host='0.0.0.0', port=5000)
    # except KeyboardInterrupt:
    #     print("Arrêt du serveur...")
    #     sys.exit(0)