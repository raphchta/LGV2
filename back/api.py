from flask import *
from websocket import create_connection
import json
from flask_cors import CORS
import random
ip = "192.168.1.15"

def rechet():#récuper les var du wedsocket
    ws = create_connection("ws://"+ip+":12345/")
    ws.send('$£CONN')
    retoure = ws.recv()
    return retoure

def criet_resquit(list_roles,code):#input roles : list ,code: int
    ws = create_connection("ws://"+ip+":12345/")
    dico = {"roles":list_roles, "code":code}
    ws.send(f'$£CrIR{json.dumps(dico)}')
    return 0

app = Flask(__name__)
CORS(app)

@app.route('/code', methods=['get'])#input code: int (code de la partie) vérifer si la partie exite
def verife_exite_partie():
    code_parti = request.args.get('code')
    dico_partis = json.loads(rechet())
    if str(code_parti) in list(dico_partis.keys()):
        return json.dumps({'reponce':'0'})
    else:
        return json.dumps({'reponce':'1'})

@app.route('/usser', methods=['get'])#input code:int(code de la partie) jouer:str (spedo) vérifi si le spedo est prix
def verife_usser():
    usser = request.args.get('usser')
    if usser is None or usser == "":
        return json.dumps({'reponce': '1'})
    dico_partis = json.loads(rechet())
    code_parti = request.args.get('code')
    if code_parti in list(dico_partis.keys()):
        if usser in dico_partis[code_parti]:
            return json.dumps({'reponce':'1'})
        else:
            return json.dumps({'reponce':'0'})
    else:
        return json.dumps({'reponce':'2'})

@app.route('/certe', methods=['get'])#input code:int(code de la partie) rles:liste
def created():
    roles = request.args.get('roles')
    list_roles = []
    dico_partis = json.loads(rechet())
    code = int
    for k,y in json.loads(roles).items():
        if y != 0:
            i = 0
            while i < y:
                list_roles.append(k)
                i += 1
        while True:
            code = random.randint(0, 65535)
            if code not in list(dico_partis.keys()) and code != 12345:
                break
    if len(list_roles) == 0:
        return json.dumps({'reponce':'1'})
    criet_resquit(list_roles,code)
    return json.dumps({'reponce':'0',"code":code})

app.run()