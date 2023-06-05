import asyncio
import websockets
import random
import json
import time
all_clients = []
codes_nom = {}
dico_code_partie = {}
ip = "192.168.1.15"

class parte:
    def __init__(self,code: str,liste_roles: list):# code de parti, liste des role ->
        print(liste_roles)
        self.code = code
        self.list_roles = liste_roles
        self.dico_jouer_socket_for_message = {}
        self.dico_jouer_socket = {}
        self.dico_jouer_role = {}
        self.str_maire = ""
        self.int_etape = -1
        self.float_temps_rest = float
        self.float_temps_fin = float
        self.dico_vote = {}
        self.list_mort = []
        self.list_couple = []
        self.dico_jouer_lg = {}
        self.list_roles_lg = ["loup-garou"]
        self.str_prosetuer = ""
        self.list_qui_vote = []
        self.dico_vote_lg = {}
        self.str_vote_lg = ""
        self.str_sible = ""
        self.list_jouer_bote_pour_re = []
        self.lies_popo = [1,1]# [popo de vie,popo de mort]
        self.str_a_qui_de_jour = "cupidon"
        self.str_der_joure = "vilage"
        self.dico_nume_role = {1:"cupidon",2:'prostituée',3:"voyante",4:"loup-garou",5:"sorcière",6:"assassin",}
    async def ristras(self):
        #self.code = code
        #self.list_roles = liste_roles
        #self.dico_jouer_socket_for_message = {}
        #self.dico_jouer_socket = {}
        #self.dico_jouer_role = {}
        self.str_maire = ""
        self.int_etape = -1
        self.dico_vote = {}
        self.list_mort = []
        self.list_couple = []
        self.dico_jouer_lg = {}
        self.list_roles_lg = ["loup-garou"]
        self.str_prosetuer = ""
        self.float_temps_rest = float
        self.float_temps_fin = float
        self.list_qui_vote = []
        self.dico_vote_lg = {}
        self.str_vote_lg = ""
        self.str_sible = ""
        self.list_jouer_bote_pour_re = []
        self.lies_popo = [1,1]# [popo de vie,popo de mort]
        self.str_a_qui_de_jour = "cupidon"
        self.str_der_joure = "vilage"
    def set_time_fin(self, temps):
        named_tuple = time.localtime()  # get struct_time
        time_string = float(self.truncate(float(time.strftime("%M.%S", named_tuple)) + temps,2))
        if time_string >= 60:
            time_string -= 60
        self.float_temps_fin = time_string

    def truncate(self,num, n):
        integer = int(num * (10 ** n)) / (10 ** n)
        return float(integer)
    async def mp(self,message, spedo:str,envoyer="le narrateur",styl=""):#envoit un message privet (ar: contenu du message et id du joure)
        client = self.get_socket(spedo)
        await client.send(json.dumps({'message':message,"envoyer":envoyer,"styl":styl}))

    async def send_message_lg(self,message,envoyer="le narrateur"):
        styl = "lg"
        for k in self.dico_jouer_lg.keys():
            await self.dico_jouer_socket_for_message[k].send(json.dumps({'message':message,"envoyer":envoyer,"styl":styl}))

    async def send_message(self,message:str,envoyer="le narrateur",styl=""):# envois un message a tout le monde (ar: contenu du message)
        for k,client in self.dico_jouer_socket_for_message.items():
            await client.send(json.dumps({'message':message,"envoyer":envoyer,"styl":styl}))

    async def sokcet_info(self,client_socket, path):
        if path == "/":
            while 1:
                roles = self.list_roles
                joures = list(self.dico_jouer_socket.keys())
                if self.int_etape != -1:
                    joures = list(self.dico_jouer_role.keys())
                    roles = list(self.dico_jouer_role.values())
                dico = {'roles':roles,"jouers":joures,"eta":self.int_etape}
                try:
                    await client_socket.send(json.dumps(dico))
                except websockets.exceptions.ConnectionClosedOK:
                    break
                await asyncio.sleep(1)
        else:
            new_message = await client_socket.recv()
            jouers = json.loads(new_message)
            jouer_moi = jouers["jouer"]
            if jouer_moi in self.dico_jouer_socket.keys():
                self.dico_jouer_socket[jouer_moi] = client_socket
                while self.int_etape == -1:
                    await asyncio.sleep(1)
                role = self.dico_jouer_role[jouer_moi]
                await client_socket.send(json.dumps({"role":role}))
                while 1:
                    try:
                        role = self.dico_jouer_role[jouer_moi]
                    except KeyError:
                        while self.int_etape == -1:
                            await asyncio.sleep(1)
                        role = self.dico_jouer_role[jouer_moi]
                        await client_socket.send(json.dumps({"role": role}))
                    if role in self.list_roles_lg:
                        lg = list(self.dico_jouer_lg.keys())
                    else:
                        lg = []
                    if jouer_moi in self.list_couple:
                        couple = self.list_couple
                    else:
                        couple = []
                    dico = {"role": role, "lg": lg, "couple": couple}
                    if self.dico_nume_role[self.int_etape] == role or self.int_etape == 7 or self.int_etape == 8:
                        named_tuple = time.localtime()
                        time_float = float(self.truncate(float(time.strftime("%M.%S", named_tuple)),2))
                        self.float_temps_rest = float(self.truncate(float(self.float_temps_fin) - float(time_float),2))
                        dico["temps"] = self.float_temps_rest
                        if self.float_temps_rest <= 0:
                            if self.int_etape == 4:
                                await self.fin_lG(iftime=0)
                            elif self.int_etape == 7:
                                await self.fin_election(iftime=0)
                            elif self.int_etape == 8:
                                await self.fin_vote(iftime=0)
                            else:
                                self.str_a_qui_de_jour = self.dico_nume_role[self.int_etape+1]
                                await self.a_qui_de_jour()
                    if role == "sorcière" and self.int_etape == 5:
                        if self.str_vote_lg != "":
                            dico['mort'] = self.str_vote_lg
                        else:
                            dico['mort'] = "personne n'"
                        dico['pop'] = self.lies_popo
                    try:
                        await client_socket.send(json.dumps(dico))
                        new_message = await client_socket.recv()
                    except websockets.exceptions.ConnectionClosedOK:
                        self.dico_jouer_socket[jouer_moi] = "c'est nule"
                        self.dico_jouer_socket_for_message[jouer_moi] = "c'est nule"
                        list_sokter = list(self.dico_jouer_socket_for_message.values()) + list(
                            self.dico_jouer_socket.values())
                        if len(list_sokter) == list_sokter.count("c'est nule"):
                            dico_code_partie.pop(self.code)
                            return 0
                        else:
                            if list_sokter.count("c'est nule") % 2 == 1:
                                print("aaaaaaaaaaaaaaa in sokcet_info")
                            return 0
                    if new_message == "":
                        continue
                    messages = json.loads(new_message)
                    jouer = list(self.dico_jouer_role.keys())
                    if self.int_etape == 1 and role == "cupidon":
                        if messages["jouer1"] in jouer and messages["jouer2"] in jouer:
                            await self.cupidon(messages["jouer1"],messages["jouer2"])
                    elif self.int_etape == 2 and role == "prostituée":
                        if messages["jouer"] in jouer:
                            await self.prostituee(messages["jouer"])
                    elif self.int_etape == 3 and role == "voyante":
                        if messages["jouer"] in jouer:
                            await self.voyante(messages["jouer"])
                    elif self.int_etape == 4 and role in self.list_roles_lg:
                        if messages["jouer"] in jouer:
                            await  self.loup_garou(messages["jouer"])
                    elif self.int_etape == 5 and role == 'sorcière':
                        if messages ["action"] == 1:
                            if "jouer" in messages:
                                await self.sorciere(messages["action"], messages["jouer"])
                        else:
                            await self.sorciere(messages["action"])
                    elif self.int_etape == 6 and role == 'assassin':
                        if messages["jouer"] in jouer:
                            await self.assassin(messages["jouer"])
                    elif self.int_etape == 7:
                        if messages["jouer"] in jouer:
                            await self.elition(messages["jouer"],jouer_moi)
                    elif self.int_etape == 8 :
                        if messages["jouer"] in jouer:
                            await  self.vote(messages["jouer"],jouer_moi)

    def get_jouer(self,role: str):
        for k,y in self.dico_jouer_role.items():
            if y == role:
                return k
        return 1
    def get_socket(self, spedo : str):#id jouer-> wedsocket
        for k, v in self.dico_jouer_socket_for_message.items():
            if k == spedo:
                return v
        return 1

    async def add_jouer(self,spedo,socket):#add un joure a la parti
                                    #id jouer, wedsocket ->
        self.dico_jouer_socket[spedo] = None
        self.dico_jouer_socket_for_message[spedo]= socket
        if len(self.dico_jouer_socket) >= len(self.list_roles):
            await self.star()

    async def star(self):#lance la parti
        await asyncio.sleep(2)
        roles = self.list_roles.copy()
        for joure in self.dico_jouer_socket.keys():
            print(roles)
            role = random.choice(roles)
            if role in self.list_roles_lg:
                self.dico_jouer_lg[joure] = role
            self.dico_jouer_role[joure] = role
            roles.remove(role)
        await self.send_message("la patri a comencer")
        if "mercenaire" in self.list_roles:
            self.str_sible = random.choice(list(self.dico_jouer_role.keys()))
            await self.mp(f"ta cible et <span class='nom'>{self.str_sible}</span>",self.get_jouer('mercenaire'))
        self.int_etape=-2
        await self.a_qui_de_jour()

    async def a_qui_de_jour(self):
        if self.int_etape >= 0:
            roles = list(self.dico_jouer_role.values())
            roles.append("vilage")
        else:
            roles = self.list_roles
        while 1:
            if self.str_a_qui_de_jour in roles:
                if self.str_der_joure != "":
                    await self.send_message(f"La <span class='nom'>{str(self.str_der_joure)}</span> se rendort .")
                await self.send_message(f"Le <span class='nom'>{self.str_a_qui_de_jour}</span> se réveille")
                if self.str_a_qui_de_jour == "cupidon":
                    self.int_etape = 1
                    self.str_der_joure = self.str_a_qui_de_jour
                    await self.mp("Clique sur deux joueurs pour les mettre en couple.",self.get_jouer('cupidon'))
                    self.set_time_fin(2)
                    break
                if self.str_a_qui_de_jour == "prostituée":
                    self.int_etape = 2
                    self.str_der_joure = self.str_a_qui_de_jour
                    await self.mp("Clique sur deux joueurs pour les mettre en couple.",self.get_jouer('prostituée'))
                    self.set_time_fin(2)
                    break
                elif self.str_a_qui_de_jour == "voyante":
                    self.int_etape = 3
                    self.str_der_joure = self.str_a_qui_de_jour
                    await self.mp("clique sur un joueur pour connaître son role.",self.get_jouer('voyante'))
                    self.set_time_fin(2)
                    break
                elif self.str_a_qui_de_jour == "loup-garou":
                    self.int_etape = 4
                    self.str_der_joure = self.str_a_qui_de_jour
                    await self.mp("clique sur un joueur pour le tuer.",self.get_jouer('loup-garou'))
                    self.set_time_fin(2)
                    break
                elif self.str_a_qui_de_jour == "sorcière":
                    self.int_etape = 5
                    self.str_der_joure = self.str_a_qui_de_jour
                    self.set_time_fin(2)
                    break
                elif self.str_a_qui_de_jour == "assassin":
                    self.int_etape = 6
                    self.str_der_joure = self.str_a_qui_de_jour
                    await self.mp("clique sur un joueur pour le tuer.",self.get_jouer('assassin'))
                    self.set_time_fin(2)
                    break
                elif self.str_a_qui_de_jour == "vilage":
                    self.str_der_joure = self.str_a_qui_de_jour
                    await self.matain()
                    break
            else:
                if self.str_a_qui_de_jour == "cupidon":
                    self.str_a_qui_de_jour = "prostituée"
                    continue
                if self.str_a_qui_de_jour == "prostituée":
                    self.str_a_qui_de_jour = "voyante"
                    continue
                if self.str_a_qui_de_jour == "voyante":
                    self.str_a_qui_de_jour = "loup-garou"
                    continue
                if self.str_a_qui_de_jour == "loup-garou":
                    self.str_a_qui_de_jour = "sorcière"
                    continue
                if self.str_a_qui_de_jour == "sorcière":
                    self.str_a_qui_de_jour = "assassin"
                    continue
                if self.str_a_qui_de_jour == "assassin":
                    self.str_a_qui_de_jour = "vilage"
                    continue

    async def get_vitori(self):
        role = list(self.dico_jouer_role.values())
        text = ''
        fin = ''
        for k in self.dico_jouer_role.keys():
            text += "<span class='nom'>" + str(k) + "</span>, "
            fin = "<span class='nom'>" + str(k) + "</span>, "
        text.replace(fin, f"et <span class='nom'>{fin}</span>.")
        if len(role) == 0:
            await self.send_message(f"peut probale!!!toule monde est mort")
            await self.ristras()
            return 1
        elif len(role) == len(self.dico_jouer_lg):
            await self.send_message(f"Les loup-garou ont gagnés! Bravo à {text}.")
            await self.ristras()
            return 1
        elif len(self.dico_jouer_lg) == 0 and "assassin" not in role:
            await self.send_message(f"Le village ont gagnés! Bravo à {text}.")
            await self.ristras()
            return 1
        elif len(self.dico_jouer_lg) == 0 and "assassin" in role:
            await  self.send_message(f"l'assassin a gagnés! Bravo à {self.get_jouer('assassin')}.")
            await self.ristras()
            return 1
        elif len(role) == len(self.list_couple) and any(element in self.list_couple for element in list(self.dico_jouer_role.keys())):
            await  self.send_message(f"le couple a gagnés! Bravo à {text}.")
            await self.ristras()
            return 1
        else:
            return 0
    async def kill(self):
        if len(self.list_mort)==0:
            await self.send_message(f"persone est mort pend la nuit.")
        unique_sweets = []
        for sweet in self.list_mort:
            if sweet not in unique_sweets:
                unique_sweets.append(sweet)
        self.list_mort = unique_sweets
        for mort in self.list_mort:
            role = self.dico_jouer_role[mort]
            if mort in list(self.dico_jouer_lg.keys()):
               self.dico_jouer_lg.pop(mort)
            if mort == self.str_maire:
                self.str_maire = ""
            if mort == self.str_prosetuer:
                self.dico_jouer_role.pop(mort)
                continue
            elif mort in self.list_couple:
                self.list_couple.remove(mort)
                await self.send_message(f"{mort} est mort,il était <span class='nom'>{role}</span>,par ammoure <span class='nom'>{self.list_couple[0]}</span> est mort il était <span class='nom'>{self.dico_jouer_role[self.list_couple[0]]}</span>")
                if self.list_couple[0] in self.list_mort:
                    self.list_mort.remove(self.list_couple[0])
                self.dico_jouer_role.pop(self.list_couple[0])
                self.dico_jouer_role.pop(mort)
                self.list_couple = []
            elif role == "prostituée":
                await self.send_message(f"<span class='nom'>{mort}</span> il était <span class='nom'>{role}</span> Malheureusement <span class='nom'>{self.str_prosetuer}</span> été au mauvais endroit au mauvais moment il est donc mort il était <span class='nom'>{self.dico_jouer_role[self.str_prosetuer]}</span>.")
                self.dico_jouer_role.pop(mort)
                self.dico_jouer_role.pop(self.str_prosetuer)
            else:
                self.dico_jouer_role.pop(mort)
                await self.send_message(f"<span class='nom'>{mort}</span> est mort,il était <span class='nom'>{role}</span>.")
        return await self.get_vitori()

    async def matain(self):
        if await self.kill():
            return 0
        if self.str_maire == "":
            await self.send_message("il est heur d'élire le maire. pour cela clique sur un jouer.")
            self.set_time_fin(5)
            self.int_etape = 7
        else:
            await self.send_message("il est heur de voter pour tuer un joure. pour cela clique sur un jouer.")
            self.set_time_fin(5)
            self.int_etape = 8

    async def cupidon(self,sedo1,sedo2):
        self.list_couple = [sedo1,sedo2]
        await self.mp(f"Tu est en couple avec <span class='nom'>{sedo2}</span>.",sedo1)
        await self.mp(f"Tu est en couple avec <span class='nom'>{sedo1}</span>.",sedo2)
        await self.mp(f"tu as mis en couple <span class='nom'>{sedo1}</span> et <span class='nom'>{sedo2}</span>",self.get_jouer("cupidon"))
        self.str_a_qui_de_jour = "prostituée"
        await self.a_qui_de_jour()

    async def voyante(self,jouer:str):
        await self.mp(f"le role de <span class='nom'>{jouer}</span> est <span class='nom'>{self.dico_jouer_role[jouer]}</span>", self.get_jouer("voyante"))
        self.str_a_qui_de_jour = "loup-garou"
        await self.a_qui_de_jour()

    async def sorciere(self, action:int, jouer : str= ""):
        # 0 il ne fair rien
        # 1 il tuer le jouer
        # 2 il sauve le jouer
        if action == 0:
            await self.mp(f"tu na rien fais.", self.get_jouer("sorcière"))
        elif action == 1:
            if self.lies_popo[1] > 0:
                self.lies_popo[1] -= 1
                self.list_mort.append(jouer)
                await self.mp(f"tu na tuer <span class='nom'>{jouer}</span>.",self.get_jouer("sorcière"))
            else:
                await self.mp(f"tu est béte comme un table", self.get_jouer("sorcière"))
        elif action == 2:
            if self.lies_popo[0] > 0:
                if self.str_vote_lg != "":
                    self.lies_popo[0] -= 1
                    self.list_mort.remove(self.str_vote_lg)
                    await self.mp(f"tu a sauver <span class='nom'>{self.str_vote_lg}</span>.",self.get_jouer("sorcière"))
                else:
                    await self.mp(f"tu est béte comme un table", self.get_jouer("sorcière"))
            else:
                await self.mp(f"tu est béte comme un table", self.get_jouer("sorcière"))
        self.str_a_qui_de_jour = "assassin"
        await self.a_qui_de_jour()

    async def prostituee(self, jouer:str):
        if self.str_prosetuer != jouer:
            self.str_prosetuer = jouer
            await self.mp(f"tu passer la nuit avec <span class='nom'>{jouer}</span>.", self.get_jouer("prostituée"))
            self.str_a_qui_de_jour = "voyante"
            await self.a_qui_de_jour()
        else:
            await self.mp(f"tu a passer derniere avec <span class='nom'>{jouer}</span>.", self.get_jouer("prostituée"))

    async def loup_garou(self,vote):
        await self.send_message_lg(f"un loup-garou a voté pour <span class='nom'>{vote}</span>.")
        if vote in list(self.dico_vote_lg.keys()):
            self.dico_vote_lg[vote] += 1
        else:
            self.dico_vote_lg[vote] = 1
        await self.fin_lG()
    async def fin_lG(self,iftime = 1):
        if iftime == 0:
            if len(self.dico_vote_lg.items())!=0:
                psersone = []
                i = 0
                x = 0
                for k, y in self.dico_vote_lg.items():
                    i += y
                    if y > x:
                        x = y
                        psersone = [k]
                    elif y == x:
                        psersone.append(k)
                psersone = random.choice(psersone)
                self.list_mort.append(psersone)
                self.str_vote_lg = psersone
                await self.send_message_lg(f"Vous avez tuer <span class='nom'>{psersone}</span>.")
            else:
                await self.send_message_lg(f"Vous avais pas votre donc persone meure se soire.")
            self.str_a_qui_de_jour = "sorcière"
            await self.a_qui_de_jour()
        else:
            i = 0
            x = 0
            psersone = []
            for k, y in self.dico_vote_lg.items():
                i += y
                if y > x:
                    x = y
                    psersone = [k]
                elif y == x:
                    psersone.append(k)
            if i == len(self.dico_jouer_lg):
                psersone = random.choice(psersone)
                self.list_mort.append(psersone)
                self.str_vote_lg = psersone
                await self.send_message_lg(f"Vous avez tuer <span class='nom'>{psersone}</span>.")
                self.str_a_qui_de_jour = "sorcière"
                await self.a_qui_de_jour()
    async def assassin(self,jouer:str):
        self.list_mort.append(jouer)
        await self.mp(f"Tu a tuer <span class='nom'>{jouer}.</span>",self.get_jouer("assassin"))
        self.str_a_qui_de_jour = "vilage"
        await self.a_qui_de_jour()

    async def elition(self,vote,jouer_qui_a_vote):
        if jouer_qui_a_vote not in self.list_qui_vote:
            await self.send_message(f"<span class='nom'>{jouer_qui_a_vote}</span> a vouter pour élire <span class='nom'>{vote}</span>.")
            self.list_qui_vote.append(jouer_qui_a_vote)
            if vote in self.dico_vote:
                self.dico_vote[vote] += 1
            else:
                self.dico_vote[vote] = 1
            await self.fin_election()
        else:
            await self.send_message(f"<span class='nom'>{jouer_qui_a_vote}</span> a déga vote.")

    async def fin_election(self,iftime=1):
        if iftime ==0:
            if len(self.dico_vote.items()) !=0:
                i = 0
                x = 0
                psersone = []
                for k, y in self.dico_vote.items():
                    i += y
                    if y > x:
                        x = y
                        psersone = [k]
                    elif y == x:
                        psersone.append(k)
                psersone = random.choice(psersone)
                self.str_maire = psersone
                await self.send_message(f"vous avez élie <span class='nom'>{psersone}</span>")
                await self.send_message("il est heur de voter pour tuer un joure. pour cela clique sur un jouer.")

            else:
                psersone = random.choice(list(self.dico_jouer_role.keys()))
                self.str_maire = psersone
                await self.send_message(f"vous avez votre pouer pernone donc il a éter tiré au sore c'est donc <span class='nom'>{psersone}</span> le mair")
                await self.send_message("il est heur de voter pour tuer un joure. pour cela clique sur un jouer.")
            self.dico_vote = {}
            self.list_qui_vote = []
            self.set_time_fin(5)
            self.int_etape = 8
        else:
            i = 0
            x = 0
            psersone = []
            for k, y in self.dico_vote.items():
                i += y
                if y > x:
                    x = y
                    psersone = [k]
                elif y == x:
                    psersone.append(k)
            if i == len(list(self.dico_jouer_role.keys())):
                psersone = random.choice(psersone)
                self.dico_vote = {}
                self.str_maire = psersone
                await self.send_message(f"vous avez élie <span class='nom'>{psersone}</span>")
                await self.send_message("il est heur de voter pour tuer un joure. pour cela clique sur un jouer.")
                self.list_qui_vote = []
                self.set_time_fin(5)
                self.int_etape = 8

    async def vote(self,vote:str,jouer_qui_a_vote:str):
        if jouer_qui_a_vote not in self.list_qui_vote:
            self.list_qui_vote.append(jouer_qui_a_vote)
            await self.send_message(f"<span class='nom'>{jouer_qui_a_vote}</span> a vouter pour tuer <span class='nom'>{vote}</span>")
            if jouer_qui_a_vote == self.str_maire:
                j = 2
            else:
                j = 1
            if vote in self.dico_vote:
                self.dico_vote[vote] += j
            else:
                self.dico_vote[vote] = j
            await self.fin_vote()
        else:
            await self.send_message(f"<span class='nom'>{jouer_qui_a_vote}</span> a déga vote.")
    async def fin_vote(self,iftime = 1):
        if iftime == 0:
            if len(self.dico_vote.items()) !=0:
                i = 0
                x = 0
                psersone = []
                for k, y in self.dico_vote.items():
                    i += y
                    if y > x:
                        x = y
                        psersone = [k]
                    elif y == x:
                        psersone.append(k)
                psersone = random.choice(psersone)
                self.dico_vote = {}
                if "bouffon" in list(self.dico_jouer_role.values()):
                    if psersone == self.get_jouer("bouffon"):
                        await self.send_message(f"<span class='nom'>{self.get_jouer('bouffon')}</span> a ganier en temps que bouffon")
                        await self.ristras()
                        return 0
                    else:
                        self.dico_jouer_role[self.get_jouer("bouffon")] = "s-v"
                        await self.mp("tu n'es pas mort tu deviens donc simple villageois",self.get_jouer("bouffon"))
                if "mercenaire" in list(self.dico_jouer_role.values()):
                    if psersone == self.str_sible:
                        await self.send_message(f"<span class='nom'>{self.get_jouer('mercenaire')}</span> a ganier en temps que mercenaire")
                        await self.ristras()
                        return 0
                    else:
                        self.dico_jouer_role[self.get_jouer("mercenaire")] = "s-v"
                        await self.mp("tu n'as pas tué ta cible.tu deviens donc simple villageois",self.get_jouer("mercenaire"))
                self.list_mort.append(psersone)
                await self.send_message(f"<span class='nom'>{psersone}</span> A été voté pour être tué.")
                if await self.kill():
                    return 0
                self.str_a_qui_de_jour = "prostituée"
                await self.a_qui_de_jour()
            else:
                await self.send_message(f"Vous aver tué perssone!")
                if "mercenaire" in list(self.dico_jouer_role.values()):
                    self.dico_jouer_role[self.get_jouer("mercenaire")] = "s-v"
                    await self.mp("tu n'as pas tué ta cible.tu deviens donc simple villageois",
                                  self.get_jouer("mercenaire"))
                if "bouffon" in list(self.dico_jouer_role.values()):
                    self.dico_jouer_role[self.get_jouer("bouffon")] = "s-v"
                    await self.mp("tu n'es pas mort tu deviens donc simple villageois", self.get_jouer("bouffon"))
        else:
            i = 0
            x = 0
            psersone = []
            for k, y in self.dico_vote.items():
                i += y
                if y > x:
                    x = y
                    psersone = [k]
                elif y == x:
                    psersone.append(k)
            if i > len(list(self.dico_jouer_role.keys())):
                psersone = random.choice(psersone)
                self.dico_vote = {}
                if "bouffon" in list(self.dico_jouer_role.values()):
                    if psersone == self.get_jouer("bouffon"):
                        await self.send_message(
                            f"<span class='nom'>{self.get_jouer('bouffon')}</span> a ganier en temps que bouffon")
                        await self.ristras()
                        return 0
                    else:
                        self.dico_jouer_role[self.get_jouer("bouffon")] = "s-v"
                        await self.mp("tu n'es pas mort tu deviens donc simple villageois", self.get_jouer("bouffon"))
                if "mercenaire" in list(self.dico_jouer_role.values()):
                    if psersone == self.str_sible:
                        await self.send_message(
                            f"<span class='nom'>{self.get_jouer('mercenaire')}</span> a ganier en temps que mercenaire")
                        await self.ristras()
                        return 0
                    else:
                        self.dico_jouer_role[self.get_jouer("mercenaire")] = "s-v"
                        await self.mp("tu n'as pas tué ta cible.tu deviens donc simple villageois",
                                      self.get_jouer("mercenaire"))
                self.list_mort.append(psersone)
                await self.send_message(f"<span class='nom'>{psersone}</span> A été voté pour être tué.")
                if await self.kill():
                    return 0
                self.str_a_qui_de_jour = "prostituée"
                await self.a_qui_de_jour()
async def new_client_cooected(client_socket, path):#quand un client se co
    new_message = await client_socket.recv()
    #-----------------------------------------pour api--------------------------------------------------------
    if new_message == '$£CONN':
        await client_socket.send(str(json.dumps(codes_nom)))
        return 0
    elif len(new_message) > 6:
        if new_message[:6] == '$£CrIR':
            json_parti = json.loads(new_message[6:])
            codes_nom[json_parti["code"]] = []
            dico_code_partie[json_parti['code']] = parte(json_parti['code'],json_parti['roles'])
            await websockets.serve(dico_code_partie[json_parti['code']].sokcet_info,ip, json_parti['code'])
            await client_socket.send("0")
            return 0
    # ------------------------------------------------------------------------------------------------------
    dico = json.loads(new_message)
    if not dico['jouer'] and not dico['code']:
        return 0
    jouer = dico["jouer"]
    if int(dico["code"]) in dico_code_partie:
        parti = dico_code_partie[int(dico['code'])]
        if jouer in parti.dico_jouer_socket and parti.dico_jouer_socket[jouer] == "c'est nule" and parti.dico_jouer_socket_for_message[jouer] == "c'est nule":
            parti.dico_jouer_socket_for_message[jouer] = client_socket
        else:
            codes_nom[int(dico["code"])].append(jouer)
            await dico_code_partie[int(dico['code'])].add_jouer(jouer,client_socket)
    else:
        return 1
    while 1:
        try:
            new_message = await client_socket.recv()
        except websockets.exceptions.ConnectionClosedOK:
            parti.dico_jouer_socket[jouer] = "c'est nule"
            parti.dico_jouer_socket_for_message[jouer] = "c'est nule"
            list_sokter = list(parti.dico_jouer_socket_for_message.values()) + list(parti.dico_jouer_socket.values())
            if len(list_sokter) == list_sokter.count("c'est nule"):
                dico_code_partie.pop(parti.code)
                return 0
            else:
                if list_sokter.count("c'est nule")%2 == 1:
                    print("aaaaaaaaaaaaaaa in new_client_cooected")
                return 0
        if new_message[:3].lower() == "/lg" and parti.int_etape != -1 and jouer in parti.dico_jouer_lg.keys():
            if len(parti.dico_jouer_lg) != 0:
                await parti.send_message_lg(new_message[3:],dico["jouer"])
                if "petite-fille" in list(parti.dico_jouer_role.values()):
                    await parti.mp(new_message[3:],parti.get_jouer("petite-fille"),envoyer='loup-garou',styl='lg')
                continue
        if new_message[:3].lower() == "/re" and parti.int_etape == -1:
            if dico["jouer"] not in parti.list_jouer_bote_pour_re:
                parti.list_jouer_bote_pour_re.append(dico["jouer"])
                if len(parti.list_jouer_bote_pour_re) == len(parti.dico_jouer_socket):
                    parti.list_jouer_bote_pour_re = []
                    await parti.send_message("ca re commence !!!!")
                    await parti.star()
            else:
                await parti.send_message(f"{jouer} tu la déga dit")
        if new_message[:4].lower() == "/rev" and parti.int_etape == -1:
            fin = ""
            if len(parti.list_jouer_bote_pour_re) == 0:
                text = "persone a voute"
            else:
                text = "les joure qui on voter sont:"
                for jouer_qui_a_vote in parti.list_jouer_bote_pour_re:
                    text += f"<span class='nom'>{jouer_qui_a_vote}</span>,"
                    fin = f"<span class='nom'>{jouer_qui_a_vote}</span>"
                text.replace(fin+",",f"est <span class='nom'>{fin}</span>")
            await parti.send_message(text)
        else:
            await parti.send_message(new_message,envoyer=dico["jouer"])


async def start_server():
    print("Server started!")
    await websockets.serve(new_client_cooected,ip,12345)

if __name__ == '__main__':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(start_server())
    event_loop.run_forever()