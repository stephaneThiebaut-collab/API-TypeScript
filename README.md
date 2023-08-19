# API TypeScript

### Request "GET" 

- VERB GET 

```bash 
http://localhost:3000/employees/get-all
```

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

### Request "POST"

- VERB POST

```bash
http://localhost:3000/employees/create-employee
```
- schema

```bash
{
    "firstName": string,
    "lastName": string,
    "email": string,
    "teams": string
}
```
- Reponse: "Employée ajouté avec success!"
- Erreur schema : Voir le details dans la reponse

---

### REQUEST "GET/:id"

VERB GET 

```bash 
http://localhost:3000/employees/get-one/:id
```
- Responses : 
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


