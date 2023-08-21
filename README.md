# API TypeScript


---

Start server
Dependence nodemon 
```bash 
npm install --save-dev nodemon
```
```bash
npm run start
```
---

## Request "GET"

### VERB GET
- url: ```http://localhost:3000/employees/get-all```
res :
```bash
    {
        "id": number,
        "firstName": string,
        "lastName": string,
        "email": string,
        "teams": string
    }
```

---

## Request "POST"

### VERB POST
- url: ``` http://localhost:3000/employees/create-employee ```
schema: 
```bash
    {
        "firstName": string,
        "lastName": string,
        "email": string,
        "teams": string
    }
```
- Reponse: "Employé ajouté avec succès!"
- Erreur schema : Voir le détail dans la réponse

---

## REQUEST "GET/:id"

### VERB GET 
- url: ``` http://localhost:3000/employees/get-one/:id ```
Responses : 
```bash
[
    {
        "id": number,
        "firstName": string,
        "lastName": string,
        "email": string,
        "teams": string
    }
]
```
- Response: Si l'id existe dans la base de données : une reponse sous tableau vous sera retourné sinon une erreur sera retournée

---

## REQUEST "PUT/:id"

### VERB PUT 
- url : ``` http://localhost:3000/employees/modify-employee/:id ```
schema : 
{
    "firstName": string,
    "lastName": string,
    "email": string,
    "teams": string
}
- Les parametres doivent etre present lors de l'envoye. Ils ne sont pas obligatoires à remplir. Une condition vérifie s'ils sont remplis. Si ce n'est pas le cas, les valeurs qui sont dans la base de donnée seront mises par défaut.
- Response: Si l'id existe dans la base de données : "L'employé a été modifié avec succès !" sinon une erreur sera retournée 

---

## REQUEST "DELETE/:id" 

### VERB DELETE
- url: ``` http://localhost:3000/employees/delete-employee/:id ```
- Response : si l'id est présent dans la base de données : "L'employé a été supprimé avec succès !" sinon une erreur sera retournée
